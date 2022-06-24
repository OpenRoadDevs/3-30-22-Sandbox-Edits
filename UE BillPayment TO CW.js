/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
*/

define(['N/https', 'N/record', 'N/email', 'N/search', './CargoWiseLib', './CargoWiseMapper'],

function callbackFunction(https, record, email, search, CargoWiseLib, CargoWiseMapper) {

function afterSubmit(context) {
    
    if(context.type !== context.UserEventType.CREATE && context.type !== context.UserEventType.EDIT && context.type !== context.UserEventType.COPY) return;    

    var _logTitle = 'Sending Payment to CW';
    try {
        var xml = CargoWiseMapper.getPaymentXML(record.Type.VENDOR_PAYMENT, context.newRecord.id);
        log.debug('xml', xml);
        if(xml) {
            var response = CargoWiseLib.request(xml, true);
            log.debug('response', response);
        }
    }
    catch(e) {
        log.error(_logTitle, e);
    }
}

return {
    afterSubmit: afterSubmit
};

});