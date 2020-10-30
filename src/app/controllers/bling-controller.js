const axios = require('axios').default;
const builder = require('xmlbuilder');
const config = require("../../config/app");
const Deal = require("../models/deal");
var moment = require('moment');
const DealController = require('../controllers/deal-controller');

class BlingController {
    constructor() {
        axios.defaults.baseURL = config.blingApiUrl;
    }

    async storeOrders(orders) {
        // Iterates the orders array
        for (let i = 0; i < orders.length; ++i) {
            const order = orders[i];
            // Check if that order already gone stored
            const alreadyStored = await Deal.findOne({ pipedrive_id: order.id });
            if (!alreadyStored) {
                try {
                    // build the xml with bling orders specifications
                    const xml = this.buildOrderXml(order);
                    const response = await this.makeRequest('/pedido/json', xml);
                    // Created on Bling 
                    if (response && response.status === 201) {
                        const deal = {
                            name: order.person_id.name,
                            description: order.title + '-' + order.id,
                            value: order.value,
                            date: order.won_time,
                            pipedrive_id: order.id,
                            bling_id: response.data.retorno.pedidos[0].pedido.idPedido
                        };
                        //  Store order locally
                        await DealController.storeDeal(deal);

                        console.log(`Order ${order.id} , ${order.person_id.name} successfully synchronized`);
                    } else {
                        // API Error
                        console.log(`Error on try sync Deal: ${order.id}`);
                        console.log(response.data.retorno.erros[0].erro);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

    }

    buildOrderXml(deal) {
        var order = builder.create('pedido', { encoding: 'utf-8' });
        const orderDate = moment(deal.won_time).format('DD/MM/YYYY');

        order.ele('data', orderDate);

        var client = order.ele('cliente');
        client.ele('nome', deal.person_id.name);

        var items = order.ele('itens');
        var item = items.ele('item');
        item.ele('codigo', deal.title + '-' + deal.id);
        item.ele('descricao', deal.title);
        item.ele('un', 'Un');
        item.ele('qtde', 1);
        item.ele('vlr_unit', deal.value);
        return order.end({
            pretty: true,
            indent: '  ',
            newline: '\n',
            width: 0,
            allowEmpty: false,
            spacebeforeslash: ''
        });
    }

    async makeRequest(path, xml) {
        const response = await axios.post(path, null, {
            params: {
                apikey: config.blingApiKey,
                xml: xml
            }
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data.retorno.erros.erro);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });

        return response
    }
}

module.exports = new BlingController();