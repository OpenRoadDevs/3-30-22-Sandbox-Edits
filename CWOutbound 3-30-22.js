/**
* @NApiVersion 2.x
* @NScriptType Suitelet
*/

define(['N/https', 'N/record', 'N/email', 'N/search', 'N/xml', 'N/encode', 'N/file', 'N/compress', './CargoWiseMapper', './CargoWiseLib'],

    function callbackFunction(https, record, email, search, xml, encode, file, compress, CargoWiseMapper, CargoWiseLib) {


        function onRequest(context) {

            try {
                //*** Validate request */
                //validate request method
                if (context.request.method != 'POST') throw new Error('Invalid request header');

                //validate soap action
                log.debug('SOAPAction', context.request.headers['SOAPAction']);
                if (!context.request.headers['SOAPAction']) throw new Error('Invalid request header');


                var xmlFileContent = context.request.body;

                var xmlObj = CargoWiseLib.parseXML(xmlFileContent);

                log.debug('xmlObj', xmlObj);

                //*** Validate request */
                CargoWiseLib.validateRequest(xmlObj);

                //*** Process Request */
                var processMap = {};
                var processList = [];

                for (var i = 0; i < xmlObj.messageList.length; i++) {

                    var msgObj = CargoWiseLib.parseUniversalInterchangeXML(xmlObj.messageList[i].message);
                    log.debug('msgObj', msgObj);
                    if (msgObj && msgObj.DataSource.Type != '' && msgObj.DataSource.Key != '') {
                        if (!processMap[msgObj.DataSource.Type]) processMap[msgObj.DataSource.Type] = {};
                        processMap[msgObj.DataSource.Type][msgObj.DataSource.Key] = msgObj;
                    }
                }

                log.debug('processMap', processMap);

                var object_type_list = Object.keys(processMap);

                if (object_type_list && object_type_list.length) {
                    object_type_list.forEach(function (object_type) {
                        var object_keys = processMap[object_type];
                        log.debug(object_type, object_keys);
                        var keys = Object.keys(object_keys);
                        if (keys && keys.length) {
                            keys.forEach(function (object_key) {
                                processList.push({
                                    Name: object_type,
                                    Key: object_key,
                                    Data: object_keys[object_key]
                                });
                            });
                        }
                    });
                }

                log.debug('processList', processList);

                for (var i = 0; i < processList.length; i++) {
                    CWObject = processList[i];

                    if (CWObject.Name == 'Organization') {
                        var cw_response = CargoWiseLib.retrieveCWObjectByKey(CWObject.Name, CWObject.Key);
                        var customerid = CargoWiseMapper.saveCustomerFromCW(cw_response);
                        log.debug('customerid', customerid);
                    }
                    else if (CWObject.Name == 'AccountingInvoice') {
                        var cw_response = CWObject.Data.AccountingInvoice;
                        if (cw_response && cw_response.Lines && cw_response.Lines.length && cw_response.OrganizationCode) {
                            if (cw_response.Ledger == 'AP') {

                                //Retrieve Vendor
                                var VendorCode = cw_response.OrganizationCode;
                                var VendorInternalId = CargoWiseMapper.searchVendorByCwCode(VendorCode);
                                if (!VendorInternalId) {
                                    var cw_organization = CargoWiseLib.retrieveCWObjectByKey('Organization', VendorCode);
                                    VendorInternalId = CargoWiseMapper.saveVendorFromCW(cw_organization);
                                }
                                if (!VendorInternalId) throw new Error('Could\'t determine vendor for CW Vendor Code - ' + VendorCode);
                                cw_response.VendorInternalId = VendorInternalId;
                                log.debug('Vendor ID', VendorInternalId);


                                //Retrieve Customer - Used to create UB Invoice during Post Cost
                                var CustomerCode = cw_response.UBDebtor;
                                log.debug('Customer ID:', CustomerCode);
                                var CustomerInternalId = CargoWiseMapper.searchCustomerByCwCode(CustomerCode);
                                if (!CustomerInternalId) {
                                    var cw_organization = CargoWiseLib.retrieveCWObjectByKey('Organization', CustomerCode);
                                    CustomerInternalId = CargoWiseMapper.saveCustomerFromCW(cw_organization);
                                }
                                if (!CustomerInternalId) throw new Error('Could\'t determine Customer for CW Customer Code - ' + CustomerCode);
                                cw_response.CustomerInternalId = CustomerInternalId;
                                log.debug('Customer ID', CustomerInternalId);


                                //Retrieve Items
                                var Lines = [];
                                cw_response.Lines.forEach(function (Line) {
                                    if (Line.CostAPInvoiceNumber == cw_response.InvNumber) {
                                        var ItemId = CargoWiseMapper.saveItemFromCW(Line);
                                        if (!ItemId) throw new Error('Could\'t determine item for CW Charge Code - ' + Line.ChargeCode);

                                        Line.ItemId = ItemId;
                                        Lines.push(Line);
                                    }
                                });
                                cw_response.Lines = Lines;

                                cw_response.InvoiceNumber = cw_response.JobKey + '-' + (cw_response.JobInvoiceNumber != '' ? cw_response.JobInvoiceNumber : 'APINV') + '-' + cw_response.InvNumber;
                                log.debug('cw_response', cw_response);

                                var vendorbillid = CargoWiseMapper.saveVendorBillFromCW(cw_response);
                                log.debug('Vendor Bill Outbound:', vendorbillid);

                                var vendorCreditid = CargoWiseMapper.saveVendorCreditFromCW(cw_response);
                                log.debug('Vendor Credit Outbound:', vendorCreditid);

                                cw_response.JobInvoiceNumber = cw_response.JobInvoiceNumber != '' ? cw_response.JobInvoiceNumber : null;
                                log.debug('cw_response', cw_response);

                                var unbilledInvoice = CargoWiseMapper.saveUnbilledInvoiceFromCW(cw_response);
                                log.debug('Unbilled Invoice Outbound:', unbilledInvoice);

                            }
                            else if (cw_response.Ledger == 'AR') {
                                //Retrieve Customer
                                var CustomerCode = cw_response.OrganizationCode;
                                var CustomerInternalId = CargoWiseMapper.searchCustomerByCwCode(CustomerCode);
                                if (!CustomerInternalId) {
                                    var cw_organization = CargoWiseLib.retrieveCWObjectByKey('Organization', CustomerCode);
                                    CustomerInternalId = CargoWiseMapper.saveCustomerFromCW(cw_organization);
                                }
                                if (!CustomerInternalId) throw new Error('Could\'t determine vendor for CW Vendor Code - ' + CustomerCode);
                                cw_response.CustomerInternalId = CustomerInternalId;

                                //Retrieve Items
                                var Lines = [];
                                cw_response.Lines.forEach(function (Line) {
                                    if (Line.SellPostedTransactionNumber == cw_response.InvNumber) {
                                        var ItemId = CargoWiseMapper.saveItemFromCW(Line);
                                        if (!ItemId) throw new Error('Could\'t determine item for CW Charge Code - ' + Line.ChargeCode);

                                        Line.ItemId = ItemId;
                                        Lines.push(Line);
                                    }
                                });
                                cw_response.Lines = Lines;

                                cw_response.InvoiceNumber = (cw_response.JobInvoiceNumber != '' ? cw_response.JobInvoiceNumber : 'ARINV') + '-' + cw_response.InvNumber;
                                log.debug('cw_response', cw_response);

                                var invoiceid = CargoWiseMapper.saveInvoiceFromCW(cw_response);
                                log.debug('Invoice ID Outbound:', invoiceid);

                                // var unbilledCreditid = CargoWiseCreator.saveUnbilledCreditFromCW(cw_response);
                                // log.debug('Unbilled Credit Outbound', unbilledCreditid);

                                var invoiceCreditid = CargoWiseMapper.saveInvoiceCreditFromCW(cw_response);
                                log.debug('Invoice Credit Outbound', invoiceCreditid);
                            }
                        }
                    }
                }





            }
            catch (e) {
                log.error('err', e);
            }

            //*** Response */
            var time_creates = new Date();
            var time_expires = new Date(time_creates.getTime() + 5 * 60000);

            var returnXml = '';
            returnXml += '<?xml version="1.0" encoding="UTF-8"?>';
            returnXml += '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
            returnXml += '    <s:Header>';
            returnXml += '        <o:Security xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" s:mustUnderstand="1">';
            returnXml += '            <u:Timestamp u:Id="_0">';
            returnXml += ('             <u:Created>' + time_creates.toISOString() + '</u:Created>');
            returnXml += ('             <u:Expires>' + time_expires.toISOString() + '</u:Expires>');
            returnXml += '            </u:Timestamp>';
            returnXml += '        </o:Security>';
            returnXml += '    </s:Header>';
            returnXml += '    <s:Body/>';
            returnXml += '</s:Envelope>';

            log.debug('returnXml', returnXml);

            context.response.addHeader({ name: 'Content-Type', value: 'text/xml; charset=utf-8' });

            context.response.write(returnXml);

        }



        return {
            onRequest: onRequest
        };

    });