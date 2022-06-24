/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
*/

define(['N/https', 'N/record', 'N/email', 'N/search', './CargoWiseLib', './CargoWiseMapper'],

function callbackFunction(https, record, email, search, CargoWiseLib, CargoWiseMapper) {

function afterSubmit(context) {
    
    if(context.type !== context.UserEventType.CREATE && context.type !== context.UserEventType.EDIT && context.type !== context.UserEventType.COPY) return;   
        
    
    var xml = CargoWiseMapper.getPaymentXML(record.Type.CUSTOMER_PAYMENT, context.newRecord.id);
    log.debug('xml', xml);
    if(xml) {
        var response = CargoWiseLib.request(xml, true);
        log.debug('response', response);
    }
}

return {
    afterSubmit: afterSubmit
};

});