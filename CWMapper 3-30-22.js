/**
 * @NApiVersion 2.x
 */

define(['N/https', 'N/http', 'N/xml', 'N/encode', 'N/file', 'N/compress', 'N/search', 'N/record', 'N/format', './CargoWiseLib'],

//function callbackFunction(https, record, email, search, CargoWiseLib, CargoWiseMapper) {

    function (https, http, xml, encode, file, compress, search, record, format, CargoWiseLib) {


        const DEFAULT_SUBSIDiARY = '2';
        const DEFAULT_AR_ACCOUNT = '318';
        const DEFAULT_AP_ACCOUNT = '1640';
        const DEFAULT_TAX_SCHEDULE = '1';
        const DEFAULT_INCOME_ACCOUNT = '1565';
        const DEFAULT_EXPENSE_ACCOUNT = '1263';
        const DEFAULT_UNBILLED_ACCOUNT = '1663';
        //const DEFAULT_MEMO_ACCOUNT = '1762';


        const CW_CONST = {
            ServerID: 'TRN',
            EnterpriseID: 'OP1',
            CompanyCode: 'DAE',
            Branch: 'DAE',
            Department: 'BRN',
            CashBankAccountCode: 'ABC'
        };

        const NS_PAYMENTMETHOD_LIST = {
            'AMEX': '11',
            'Cash': '1',
            'Check': '2',
            'Comcheck': '8',
            'Discover': '3',
            'EFTC': '7',
            'Master Card': '4',
            'On Hold': '10',
            'See Paperwork': '9',
            'VISA': '5',
        };

        const DEPARTMENTS = {
            Accounting: 7,
            Admin: 1,
            Driver: 14,
            HR: 6,
            IT: 13,
            Marketing: 4,
            Operations: 10,
            Other: 9,
            Overhead: 8,
            R_D: 3,
        };

        const CLASS = {
            GlobalForwarding: 33,
        };

        const BUSINESS_DEVISIONS = {
            Agriculture: 6,
            BusinessOwnership: 10,
            Construction: 5,
            GlobalForwarding: 1,
            Government: 7,
            Manufacturing: 2,
            NAST: 13,
            Old_Trucking: 14,
            RealProperty: 9,
            Securities: 8,
            Transportation: 3,
        };

        const LOCATIONS = {
            GlobalForwarding: 33,
        }

        function getPaymentXML(rec_type, rec_id) {

            //var batchXML = [];
        //     if (!rec_type || !rec_id) throw new Error('Unknown record type and id');

        //     if (rec_type != record.Type.VENDOR_PAYMENT && rec_type != record.Type.CUSTOMER_PAYMENT) throw new Error('Unknown record type');

        //     var rec = record.load({ type: rec_type, id: rec_id, isDynamic: true });
        //     log.debug('rec load for getPayment', rec);
        //     // log.debug('rec type', rec_type);
        //     // log.debug('rec id', rec_id);

        //     if (!rec) throw new Error('Couldn\'t load record'); 


        //     var sch = search.create({
        //         type: rec_type == record.Type.VENDOR_PAYMENT ? search.Type.VENDOR_BILL : search.Type.INVOICE,
        //         filters: [
        //             { name: 'custbody_is_cargowise', operator: 'is', values: ['T'] },
        //             { name: 'applyinglinktype', operator: 'anyof', values: ['Payment'] },
        //             { name: 'internalid', join: 'applyingtransaction', operator: 'anyof', values: [rec_id] },
        //         ],
        //         columns: [
        //             'externalid',
        //             'custbody_is_cargowise', 
        //             'status',
        //             'custbody_cw_transaction_key', // CW Transaction Key - "AP INV T-INV-3"
        //             'custbody_cw_job_invoicenumber', // JobInvoiceNumber - "CW00000227"
        //             'custbody_cw_event_branch', // CW Event Branch - "DAE"
        //             'custbody_cw_event_department', // CW Event Department - "BRN"
        //             'custbody_cw_job_key', // Job Number - "S00001082"
        //             'amount', // Collecting individual $ values - error hit when pulled from the payment total
        //         ]
        //     });
        //     log.debug('sch', sch);

        //     var resultSet = sch.run();
        //     //log.debug('Result Set', resultSet);
        //     var resultRange = resultSet.getRange({ start: 0, end: 1000 });
        //     log.debug('Result Range', resultRange);



        //     if (!resultRange || !resultRange.length) throw new Error('No invoice record found.');


        //     for (var i = 0; i < resultRange.length; i++) {
        //         // var invoiceInfo = resultRange[i];
        //     var invoiceInfo = resultRange[i];
        //     log.debug('Get Payment invoiceinfo', invoiceInfo);
            

        //     var invoiceDetails = {
        //         //internalID1: invoiceInfo.getValue('internalid'),
        //         externalId1: invoiceInfo.getValue('externalid'),
        //         isCargoWise: invoiceInfo.getValue('custbody_is_cargowise'),
        //         transKey1: invoiceInfo.getValue('custbody_cw_transaction_key'),
        //         jobKey1: invoiceInfo.getValue('custbody_cw_job_invoicenumber'),
        //     };
        //     log.debug('invoiceDetails', invoiceDetails);
        //     //log.debug('internalID1', internalID1);
        //     log.debug('externalId1', invoiceDetails.externalId1);
        //     log.debug('isCargoWise', invoiceDetails.isCargoWise);
        //     log.debug('transKey1', invoiceDetails.transKey1);


        //     if (invoiceDetails.externalId1){
        //         var recordid = searchVendorBillByCwCode(invoiceDetails.externalId1);

        //     var recordFinder = record.load({ type: record.Type.VENDOR_BILL, id: recordid, isDynamic: true });
        //     log.debug('recordFinder', recordFinder);
        //     };


        //     var info = {
        //         createddate: rec.getValue('createddate'),
        //         trandate: rec.getValue('trandate'),
        //         entityid: rec_type == record.Type.VENDOR_PAYMENT ? rec.getValue('entity') : rec.getValue('customer'),
        //         currencysymbol: rec.getText('currencysymbol'),
        //         //total: invoiceInfo.getValue('amount'),
        //         checknumber: rec.getValue('checknumber') ? rec.getValue('checknumber') : '',
        //         //externalid: invoiceInfo.getValue( 'externalid' ),
        //         //JobKey: invoiceInfo.getValue( 'custbody_cw_transaction_key' ),
        //         //internalID: invoiceInfo.getValue('internalid'),
        //     };

        //     log.debug('info', info);
        //     log.debug('info.entityid', info.entityid);
        //     //log.debug('info.total', info.total);
        //     //log.debug('jobkey', info.JobKey);
        //     //log.debug('info.externalid', info.externalid);
        //     var lookups = search.lookupFields({ type: rec_type == record.Type.VENDOR_PAYMENT ? record.Type.VENDOR : record.Type.CUSTOMER, id: info.entityid, columns: ['custentity_cw_org_code'] });
        //     log.debug('lookups', lookups);
        //     info.entity_code = lookups.custentity_cw_org_code;
        // };

            // try {


                if (!rec_type || !rec_id) throw new Error('Unknown record type and id');

                if (rec_type != record.Type.VENDOR_PAYMENT && rec_type != record.Type.CUSTOMER_PAYMENT) throw new Error('Unknown record type');

                var rec = record.load({ type: rec_type, id: rec_id, isDynamic: true });
                log.debug('rec load for getPayment', rec);
                // log.debug('rec type', rec_type);
                // log.debug('rec id', rec_id);

                if (!rec) throw new Error('Couldn\'t load record'); 


                var sch = search.create({
                    type: rec_type == record.Type.VENDOR_PAYMENT ? search.Type.VENDOR_BILL : search.Type.INVOICE,
                    filters: [
                        { name: 'custbody_is_cargowise', operator: 'is', values: ['T'] },
                        { name: 'applyinglinktype', operator: 'anyof', values: ['Payment'] },
                        { name: 'internalid', join: 'applyingtransaction', operator: 'anyof', values: [rec_id] },
                    ],
                    columns: [
                        'externalid',
                        'custbody_is_cargowise', 
                        'status',
                        'custbody_cw_transaction_key', // CW Transaction Key - "AP INV T-INV-3"
                        'custbody_cw_job_invoicenumber', // JobInvoiceNumber - "CW00000227"
                        'custbody_cw_event_branch', // CW Event Branch - "DAE"
                        'custbody_cw_event_department', // CW Event Department - "BRN"
                        'custbody_cw_job_key', // Job Number - "S00001082"
                        'amount', // Collecting individual $ values - error hit when pulled from the payment total
                    ]
                });
                log.debug('sch', sch);

                var resultSet = sch.run();
                //log.debug('Result Set', resultSet);
                var resultRange = resultSet.getRange({ start: 0, end: 1000 });
                log.debug('Result Range', resultRange);

 

                if (!resultRange || !resultRange.length) throw new Error('No invoice record found.');


                for (var i = 0; i < resultRange.length; i++) {
                    // var invoiceInfo = resultRange[i];
                var invoiceInfo = resultRange[i];
                log.debug('Get Payment invoiceinfo', invoiceInfo);
                

                var invoiceDetails = {
                    //internalID1: invoiceInfo.getValue('internalid'),
                    externalId1: invoiceInfo.getValue('externalid'),
                    isCargoWise: invoiceInfo.getValue('custbody_is_cargowise'),
                    transKey1: invoiceInfo.getValue('custbody_cw_transaction_key'),
                    jobKey1: invoiceInfo.getValue('custbody_cw_job_invoicenumber'),
                };
                log.debug('invoiceDetails', invoiceDetails);
                //log.debug('internalID1', internalID1);
                log.debug('externalId1', invoiceDetails.externalId1);
                log.debug('isCargoWise', invoiceDetails.isCargoWise);
                log.debug('transKey1', invoiceDetails.transKey1);


                if (invoiceDetails.externalId1){
                    var recordid = searchVendorBillByCwCode(invoiceDetails.externalId1);
                };
                if(recordid){
                    var recordFinder = record.load({ type: record.Type.VENDOR_BILL, id: recordid, isDynamic: true });
                    log.debug('recordFinder', recordFinder);
                };


                var info = {
                    createddate: rec.getValue('createddate'),
                    trandate: rec.getValue('trandate'),
                    entityid: rec_type == record.Type.VENDOR_PAYMENT ? rec.getValue('entity') : rec.getValue('customer'),
                    currencysymbol: rec.getText('currencysymbol'),
                    //total: invoiceInfo.getValue('amount'),
                    checknumber: rec.getValue('checknumber') ? rec.getValue('checknumber') : '',
                    //externalid: invoiceInfo.getValue( 'externalid' ),
                    //JobKey: invoiceInfo.getValue( 'custbody_cw_transaction_key' ),
                    //internalID: invoiceInfo.getValue('internalid'),
                };

                log.debug('info', info);
                log.debug('info.entityid', info.entityid);
                log.debug('info.total', info.total);
                //log.debug('jobkey', info.JobKey);
                //log.debug('info.externalid', info.externalid);
                var lookups = search.lookupFields({ type: rec_type == record.Type.VENDOR_PAYMENT ? record.Type.VENDOR : record.Type.CUSTOMER, id: info.entityid, columns: ['custentity_cw_org_code'] });
                log.debug('lookups', lookups);
                info.entity_code = lookups.custentity_cw_org_code;
                

                var paymentInfo = null;

                if (rec_type == record.Type.VENDOR_PAYMENT) {
                    var account = rec.getValue('account');
                    var accttype = rec.getValue('accttype');
                    log.debug('accounttype', accttype);

                    if (accttype == 'Bank') {
                        paymentInfo = {
                            type: 'Cash',
                            payment_type: 'CSH',
                            check_book_code: invoiceInfo.getValue('tranid'),
                            payment_ref: 'CSH',
                            bank_account: CW_CONST.CashBankAccountCode,
                        };
                    }
                }
                else {
                    var payment_type = rec.getValue('paymenttype');
                    var paymentmethod = rec.getValue('paymentmethod');
                    log.debug('paymentmethod', paymentmethod);

                    var paymentmethod_name = '';
                    Object.keys(NS_PAYMENTMETHOD_LIST).forEach(function (key) {
                        if (NS_PAYMENTMETHOD_LIST[key] == paymentmethod) {
                            paymentmethod_name = key;
                            log.debug('Payment Method name:', paymentmethod_name);
                        }
                    });

                    if (paymentmethod_name == 'Cash') {
                        paymentInfo = {
                            type: 'Cash',
                            payment_type: 'CSH',
                            check_book_code: rec.getValue('transactionnumber'),
                            payment_ref: 'CSH',
                            bank_account: CW_CONST.CashBankAccountCode,
                        };
                    }
                    else if (paymentmethod_name != '') {//Check. ///
                        paymentInfo = {
                            type: 'Check',
                            payment_type: 'CHQ',
                            check_book_code: rec.getValue('transactionnumber'),
                            payment_ref: info.checknumber,
                            bank_account: CW_CONST.CashBankAccountCode,
                        };
                    }
                }

                if (!paymentInfo) throw new Error('Couldn\'t determine payment information');

                // var {invoiceDetails, info} = xml;
                // log.debug('invoiceDetails', invoiceDetails);
             } try {
                var xml = [''];

                xml += ('<UniversalTransactionBatch xmlns="http://www.cargowise.com/Schemas/Universal/2011/11" version="1.1">');
                xml += ('    <TransactionBatch>');
                xml += ('        <DataContext>');
                xml += ('            <Company>');
                xml += ('                <Code>' + CW_CONST.CompanyCode + '</Code>');
                xml += ('            </Company>');
                xml += ('            <EnterpriseID>' + CW_CONST.EnterpriseID + '</EnterpriseID>');
                xml += ('            <ServerID>' + CW_CONST.ServerID + '</ServerID>');
                xml += ('        </DataContext>');
                xml += ('        <TransactionCollection>');
                xml += ('            <Transaction>');
                xml += ('                <DataContext>');
                xml += ('                    <DataTargetCollection>');
                xml += ('                        <DataTarget>');
                xml += ('                            <Type>AccountingPayment</Type>');
                xml += ('                        </DataTarget>');
                xml += ('                    </DataTargetCollection>');
                xml += ('                </DataContext>');
                xml += ('                <Ledger>' + (rec_type == record.Type.VENDOR_PAYMENT ? 'AP' : 'AR') + '</Ledger>');
                xml += ('                <TransactionType>' + (rec_type == record.Type.VENDOR_PAYMENT ? 'PAY' : 'REC') + '</TransactionType>');
                xml += ('                <TransactionDate>' + (info.createddate.toISOString()) + '</TransactionDate>');
                xml += ('                <PostDate>' + (info.trandate.toISOString()) + '</PostDate>');
                xml += ('                <OrganizationsTransactionID/>');
                xml += ('                <OrganizationAddress>');
                xml += ('                    <AddressType>' + 'OFC' + '</AddressType>');
                xml += ('                    <OrganizationCode>' + (info.entity_code) + '</OrganizationCode>');
                xml += ('                </OrganizationAddress>');
                xml += ('                <Description>' + (rec_type == record.Type.VENDOR_PAYMENT ? 'AP Payment' : 'AR Receipt') + '</Description>');
                if (paymentInfo.type == 'Cash') {
                    xml += ('                <PaymentOrReceiptType>' + paymentInfo.payment_type + '</PaymentOrReceiptType>');
                    xml += ('                <BankAccount>' + paymentInfo.bank_account + '</BankAccount>');
                    xml += ('                <CheckBookCode>' + (paymentInfo.check_book_code ? paymentInfo.check_book_code : '') + '</CheckBookCode>');
                    xml += ('                <CheckNumberOrPaymentRef>' + paymentInfo.payment_ref + '</CheckNumberOrPaymentRef>');
                }
                else if (paymentInfo.type != '') {//Check
                    xml += ('                <PaymentOrReceiptType>' + paymentInfo.payment_type + '</PaymentOrReceiptType>');
                    xml += ('                <BankAccount>' + paymentInfo.bank_account + '</BankAccount>');
                    xml += ('                <CheckBookCode>' + (paymentInfo.payment_ref ? paymentInfo.payment_ref : '') + '</CheckBookCode>');
                    xml += ('                <CheckNumberOrPaymentRef>' + paymentInfo.payment_ref + '</CheckNumberOrPaymentRef>');
                }
                else {

                }

                xml += ('                <OSCurrency>');
                xml += ('                    <Code>' + (info.currencysymbol) + '</Code>');
                xml += ('                </OSCurrency>');

                xml += ('                <OSExGSTVATAmount>' + (info.total) + '</OSExGSTVATAmount>');
                xml += ('                <OSTotal>' + (info.total) + '</OSTotal>');
                xml += ('                <LocalCurrency>');
                xml += ('                    <Code>' + (info.currencysymbol) + '</Code>');
                xml += ('                </LocalCurrency>');
                xml += ('                <LocalExVATAmount>' + (info.total) + '</LocalExVATAmount>');
                xml += ('                <LocalTotal>' + (info.total) + '</LocalTotal>');
                xml += ('                <Branch>');
                xml += ('                    <Code>' + (CW_CONST.Branch) + '</Code>');
                xml += ('                </Branch>');
                xml += ('                <Department>');
                xml += ('                    <Code>' + (CW_CONST.Department) + '</Code>');
                xml += ('                </Department>');
                if (paymentInfo.type == 'Cash') {
                    xml += ('                <CheckDrawer/>');
                    xml += ('                <DrawerBank/>');
                    xml += ('                <DrawerBranch/>');

                }
                else if (paymentInfo != '') {
                    xml += ('                <CheckDrawer>' + (info.entityid) + '</CheckDrawer>');
                    xml += ('                <DrawerBank>NO</DrawerBank>');
                    xml += ('                <DrawerBranch>NO</DrawerBranch>');
                }
                xml += ('                <MatchLineCollection>');
                xml += ('                    <MatchLine>');
                xml += ('                        <LinkedTransactionIDCollection>');
                xml += ('                            <LinkedTransactionID>');
                xml += ('                                <Type>AccountingInvoice</Type>');
                // xml += ('                                <Key>' + (rec_type == record.Type.VENDOR_PAYMENT ? 'AP INV'+' '+ info.JobKey : 'AR INV'+' '+ info.JobKey) + '</Key>');
                xml += ('                                <Key>' +(info.JobKey)+ '</Key>');
                xml += ('                            </LinkedTransactionID>');
                xml += ('                        </LinkedTransactionIDCollection>');
                xml += ('                        <OSPaidAmount>' + (rec_type == record.Type.VENDOR_PAYMENT ? -1 * info.total : info.total) + '</OSPaidAmount>');
                xml += ('                        <OrganizationAddress>');
                xml += ('                            <AddressType>' + 'OFC' +'</AddressType>');
                xml += ('                            <OrganizationCode>' + (info.entity_code) + '</OrganizationCode>');
                xml += ('                        </OrganizationAddress>');
                xml += ('                    </MatchLine>');
                xml += ('                </MatchLineCollection>');
                xml += ('                <PostingJournalCollection>');
                xml += ('                    <PostingJournal/>');
                xml += ('                </PostingJournalCollection>');
                xml += ('            </Transaction>');
                xml += ('        </TransactionCollection>');
                xml += ('    </TransactionBatch>');
                xml += ('</UniversalTransactionBatch>');

                    //var response = CargoWiseLib.request(xml, true);
                    return xml;
            
                //log.debug('XML final contents', xml); //{continue};
            

                //return xml;
                
             
        }
            catch (e) {
                log.error('getPaymentXML [rec_type=' + rec_type + ', rec_id=' + rec_id + ']', e);
            }
            return null;
        }

        function searchCustomerByCwCode(cw_org_key) {

            if (!cw_org_key || cw_org_key == '') return null;

            var mySearch = search.create({
                type: search.Type.CUSTOMER,
                columns: [],
                // filters: ['entityid', 'is', cw_org_key]
                // filters: ['externalId', 'is', cw_org_key]
                filters: ['custentity_cw_org_code', 'is', cw_org_key]
            });

            var myResultSet = mySearch.run();

            var resultRange = myResultSet.getRange({ start: 0, end: 50 });

            for (var i = 0; i < resultRange.length; i++) {
                return resultRange[i].id;
            }

            return null;
        }

        function searchContactByPKCode(cw_pk_code) {

            if (!cw_pk_code || cw_pk_code == '') return null;

            var mySearch = search.create({
                type: search.Type.CONTACT,
                columns: [],
                filters: ['externalid', 'is', cw_pk_code]
            });

            var myResultSet = mySearch.run();

            var resultRange = myResultSet.getRange({ start: 0, end: 50 });

            for (var i = 0; i < resultRange.length; i++) {
                return resultRange[i].id;
            }

            return null;
        }

        function searchVendorByCwCode(cw_org_key) {

            if (!cw_org_key || cw_org_key == '') return null;

            var mySearch = search.create({
                type: search.Type.VENDOR,
                columns: [],
                // filters: ['entityid', 'is', cw_org_key]
                // filters: ['externalId', 'is', cw_org_key]
                filters: ['custentity_cw_org_code', 'is', cw_org_key]
            });

            var myResultSet = mySearch.run();

            var resultRange = myResultSet.getRange({ start: 0, end: 50 });

            for (var i = 0; i < resultRange.length; i++) {
                return resultRange[i].id;
            }

            return null;
        }

        function searchItemByCwCode(cw_key) {

            if (!cw_key || cw_key == '') return null;

            var mySearch = search.create({
                type: search.Type.NON_INVENTORY_ITEM,
                columns: [],
                filters: ['itemid', 'is', cw_key]
            });

            var myResultSet = mySearch.run();

            var resultRange = myResultSet.getRange({ start: 0, end: 50 });

            for (var i = 0; i < resultRange.length; i++) {
                return resultRange[i].id;
            }

            return null;
        }

        function searchInvoiceByCwCode(cw_key) {

            if (!cw_key || cw_key == '') return null;

            var mySearch = search.create({
                type: search.Type.INVOICE,
                columns: [],
                filters: ['tranid', 'is', cw_key]
            }); log.debug('Credit search results:', cw_key);

            var myResultSet = mySearch.run();

            var resultRange = myResultSet.getRange({ start: 0, end: 50 });

            for (var i = 0; i < resultRange.length; i++) {
                return resultRange[i].id;
            }

            return null;
        }

        function searchVendorBillByCwCode(cw_key) {

            if (!cw_key || cw_key == '') return null;
            log.debug('VB Search value:', cw_key);

            var mySearch = search.create({
                type: search.Type.VENDOR_BILL,
                columns: [],
                filters: ['externalid', 'is', cw_key]
            });

            var myResultSet = mySearch.run();

            var resultRange = myResultSet.getRange({ start: 0, end: 50 });

            for (var i = 0; i < resultRange.length; i++) {
                return resultRange[i].id;
            }

            return null;
        }

        function searchCreditMemoByCode(cw_key) {

            if (!cw_key || cw_key == '') return null;

            var mySearch = search.create({
                type: search.Type.INVOICE,
                columns: [],
                filters: ['externalid', 'is', cw_key]
            });

            var myResultSet = mySearch.run();

            var resultRange = myResultSet.getRange({ start: 0, end: 50 });

            for (var i = 0; i < resultRange.length; i++) {
                return resultRange[i].id;
            }

            return null;
        }

        function searchUnbilledInvoiceByCwCode(cw_key) {

            if (!cw_key || cw_key == '') return null;
            log.debug('CW Key value:', cw_key);

            var mySearch = search.create({
                type: search.Type.INVOICE,
                columns: [],
                filters: ['externalid', 'is', cw_key],
            });

            var myResultSet = mySearch.run()
            var resultRange = myResultSet.getRange({ start: 0, end: 50 });
            // log.debug('Result range values:', resultRange);

            for (var i = 0; i < resultRange.length; i++) {
                return resultRange[i].id;
            }

            return null;
        }

        function searchVendorCreditByCwCode(cw_key) {

            if (!cw_key || cw_key == '') return null;

            var mySearch = search.create({
                type: search.Type.VENDOR_CREDIT,
                columns: [],
                filters: ['externalid', 'is', cw_key]
            });

            var myResultSet = mySearch.run();

            var resultRange = myResultSet.getRange({ start: 0, end: 50 });

            for (var i = 0; i < resultRange.length; i++) {
                return resultRange[i].id;
            }

            return null;
        }

        function saveCustomerFromCW(cw_organization) {

            if (!cw_organization) return null;
            log.debug('cw_organization', cw_organization);
            try {
                var customerid = searchCustomerByCwCode(cw_organization.Code);

                var customerRec = customerid ? record.load({ type: record.Type.CUSTOMER, id: customerid, isDynamic: true }) : record.create({ type: record.Type.CUSTOMER, isDynamic: true });

                // customerRec.setValue({fieldId: 'entityid', value: cw_organization.Code, ignoreFieldChange: true});
                customerRec.setValue({ fieldId: 'entityid', value: cw_organization.FullName, ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'custentity_is_cargowise', value: true, ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'isperson', value: 'F', ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'companyname', value: cw_organization.FullName, ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'subsidiary', value: DEFAULT_SUBSIDiARY, ignoreFieldChange: true });//OpenRoad
                customerRec.setValue({ fieldId: 'terms', value: '2', ignoreFieldChange: true }); //Net 30
                customerRec.setValue({ fieldId: 'externalId', value: cw_organization.Code, ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'custentity_cw_accountid', value: cw_organization.Code + ' ' + cw_organization.FullName, ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'custentity_cw_org_code', value: cw_organization.Code, ignoreFieldChange: true });




                //email
                //phone
                var primaryphone = null;
                var primaryemail = null;;
                //address

                for (var i = customerRec.getLineCount({ sublistId: 'addressbook' }) - 1; i >= 0; i--) {
                    customerRec.removeLine({ sublistId: 'addressbook', line: i, ignoreRecalc: true });
                }

                if (cw_organization.Collections && cw_organization.Collections.OrgAddressCollection) {

                    cw_organization.Collections.OrgAddressCollection.ElementList.forEach(function (addresscollection) {
                        var companyname_override = addresscollection.CompanyNameOverride.trim();

                        customerRec.selectNewLine({ sublistId: 'addressbook' });
                        var myAddressSubRecord = customerRec.getCurrentSublistSubrecord({ sublistId: 'addressbook', fieldId: 'addressbookaddress' });
                        myAddressSubRecord.setValue({ fieldId: 'addressee', value: companyname_override != '' ? companyname_override : cw_organization.FullName });
                        myAddressSubRecord.setValue({ fieldId: 'addr1', value: addresscollection.Address1 });
                        myAddressSubRecord.setValue({ fieldId: 'addr2', value: addresscollection.Address2 });
                        myAddressSubRecord.setValue({ fieldId: 'city', value: addresscollection.City });
                        myAddressSubRecord.setValue({ fieldId: 'state', value: addresscollection.State });
                        myAddressSubRecord.setValue({ fieldId: 'phone', value: addresscollection.Phone });
                        myAddressSubRecord.setValue({ fieldId: 'country', value: addresscollection.CountryCode });
                        myAddressSubRecord.setValue({ fieldId: 'zip', value: addresscollection.PostCode });

                        if (!primaryemail && addresscollection.Email && addresscollection.Email != '') primaryemail = addresscollection.Email;
                        if (!primaryphone && addresscollection.Phone && addresscollection.Phone != '') primaryphone = addresscollection.Phone;

                        customerRec.commitLine({ sublistId: 'addressbook' });
                    });
                }




                if (primaryphone) customerRec.setValue({ fieldId: 'phone', value: primaryphone, ignoreFieldChange: true });
                if (primaryemail) customerRec.setValue({ fieldId: 'email', value: primaryemail, ignoreFieldChange: true });

                var recordid = customerRec.save({ enableSourcing: false, ignoreMandatoryFields: false });

                //Contact

                if (cw_organization.Collections && cw_organization.Collections.OrgContactCollection) {
                    var contact_count = 0;
                    cw_organization.Collections.OrgContactCollection.ElementList.forEach(function (contactcollection) {
                        log.debug('contactcollection', contactcollection);
                        var contactid = searchContactByPKCode(contactcollection.PK.trim());
                        var contactRec = contactid ? record.load({ type: record.Type.CONTACT, id: contactid, isDynamic: true }) : record.create({ type: record.Type.CONTACT, isDynamic: true });

                        contactRec.setValue({ fieldId: 'externalid', value: contactcollection.PK.trim() });
                        contactRec.setValue({ fieldId: 'entityid', value: contactcollection.ContactName.trim() });
                        contactRec.setValue({ fieldId: 'email', value: contactcollection.Email.trim() });
                        contactRec.setValue({ fieldId: 'phone', value: contactcollection.Phone.trim() });
                        contactRec.setValue({ fieldId: 'fax', value: contactcollection.Fax.trim() });
                        contactRec.setValue({ fieldId: 'mobilephone', value: contactcollection.Mobile.trim() });
                        contactRec.setValue({ fieldId: 'homephone', value: contactcollection.HomePhone.trim() });
                        contactRec.setValue({ fieldId: 'custentity_is_cargowise', value: true });


                        contactRec.setValue({ fieldId: 'company', value: recordid });

                        contactRec.setValue({ fieldId: 'contactrole', value: contact_count == 0 ? -10 : 20 });

                        contactid = contactRec.save();
                        log.debug('contactid', contactid);
                        contact_count++;
                    });
                }
                return recordid;
            }
            catch (e) {
                log.error('saveCustomerFromCW [customer code = ' + cw_organization.Code + ']', e);
            }
            return null;
        }

        function saveVendorFromCW(cw_organization) {

            if (!cw_organization) return null;
            log.debug('cw_organization', cw_organization);
            try {
                var customerid = searchVendorByCwCode(cw_organization.Code);

                var customerRec = customerid ? record.load({ type: record.Type.VENDOR, id: customerid, isDynamic: true }) : record.create({ type: record.Type.VENDOR, isDynamic: true });

                customerRec.setValue({ fieldId: 'entityid', value: cw_organization.FullName, ignoreFieldChange: true });
                // customerRec.setValue({fieldId: 'entityid', value: cw_organization.Code, ignoreFieldChange: true});
                customerRec.setValue({ fieldId: 'custentity_is_cargowise', value: true, ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'isperson', value: 'F', ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'companyname', value: cw_organization.FullName, ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'subsidiary', value: DEFAULT_SUBSIDiARY, ignoreFieldChange: true });//OpenRoad
                customerRec.setValue({ fieldId: 'terms', value: '2', ignoreFieldChange: true });//Net 30
                customerRec.setValue({ fieldId: 'externalId', value: cw_organization.Code, ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'custentity_cw_accountid', value: cw_organization.Code + ' ' + cw_organization.FullName, ignoreFieldChange: true });
                customerRec.setValue({ fieldId: 'custentity_cw_org_code', value: cw_organization.Code, ignoreFieldChange: true });

                //email
                //phone
                var primaryphone = null;
                var primaryemail = null;
                //address

                for (var i = customerRec.getLineCount({ sublistId: 'addressbook' }) - 1; i >= 0; i--) {
                    customerRec.removeLine({ sublistId: 'addressbook', line: i, ignoreRecalc: true });
                }

                if (cw_organization.Collections && cw_organization.Collections.OrgAddressCollection) {

                    cw_organization.Collections.OrgAddressCollection.ElementList.forEach(function (addresscollection) {
                        var companyname_override = addresscollection.CompanyNameOverride.trim();
                        customerRec.selectNewLine({ sublistId: 'addressbook' });
                        var myAddressSubRecord = customerRec.getCurrentSublistSubrecord({ sublistId: 'addressbook', fieldId: 'addressbookaddress' });
                        // myAddressSubRecord.setValue({fieldId: 'addressee', value: addresscollection.Code});
                        myAddressSubRecord.setValue({ fieldId: 'addressee', value: companyname_override != '' ? companyname_override : cw_organization.FullName });
                        myAddressSubRecord.setValue({ fieldId: 'addr1', value: addresscollection.Address1 });
                        myAddressSubRecord.setValue({ fieldId: 'addr2', value: addresscollection.Address2 });
                        myAddressSubRecord.setValue({ fieldId: 'city', value: addresscollection.City });
                        myAddressSubRecord.setValue({ fieldId: 'state', value: addresscollection.State });
                        myAddressSubRecord.setValue({ fieldId: 'phone', value: addresscollection.Phone });
                        myAddressSubRecord.setValue({ fieldId: 'country', value: addresscollection.CountryCode });
                        myAddressSubRecord.setValue({ fieldId: 'zip', value: addresscollection.PostCode });

                        if (!primaryemail && addresscollection.Email && addresscollection.Email != '') primaryemail = addresscollection.Email;
                        if (!primaryphone && addresscollection.Phone && addresscollection.Phone != '') primaryphone = addresscollection.Phone;

                        customerRec.commitLine({ sublistId: 'addressbook' });
                    });
                }

                if (primaryphone) customerRec.setValue({ fieldId: 'phone', value: primaryphone, ignoreFieldChange: true });
                if (primaryemail) customerRec.setValue({ fieldId: 'email', value: primaryemail, ignoreFieldChange: true });

                var recordid = customerRec.save({ enableSourcing: false, ignoreMandatoryFields: false });

                //Contact

                if (cw_organization.Collections && cw_organization.Collections.OrgContactCollection) {
                    var contact_count = 0;
                    cw_organization.Collections.OrgContactCollection.ElementList.forEach(function (contactcollection) {
                        log.debug('contactcollection', contactcollection);
                        var contactid = searchContactByPKCode(contactcollection.PK.trim());
                        var contactRec = contactid ? record.load({ type: record.Type.CONTACT, id: contactid, isDynamic: true }) : record.create({ type: record.Type.CONTACT, isDynamic: true });

                        contactRec.setValue({ fieldId: 'externalid', value: contactcollection.PK.trim() });
                        contactRec.setValue({ fieldId: 'entityid', value: contactcollection.ContactName.trim() });
                        contactRec.setValue({ fieldId: 'email', value: contactcollection.Email.trim() });
                        contactRec.setValue({ fieldId: 'phone', value: contactcollection.Phone.trim() });
                        contactRec.setValue({ fieldId: 'fax', value: contactcollection.Fax.trim() });
                        contactRec.setValue({ fieldId: 'mobilephone', value: contactcollection.Mobile.trim() });
                        contactRec.setValue({ fieldId: 'homephone', value: contactcollection.HomePhone.trim() });
                        contactRec.setValue({ fieldId: 'custentity_is_cargowise', value: true });


                        contactRec.setValue({ fieldId: 'company', value: recordid });

                        contactRec.setValue({ fieldId: 'contactrole', value: contact_count == 0 ? -10 : 20 });

                        contactid = contactRec.save();
                        log.debug('contactid', contactid);
                        contact_count++;
                    });
                }
                return recordid;
            }
            catch (e) {
                log.error('saveVendorFromCW [vendor code = ' + cw_organization.Code + ']', e);
            }
            return null;
        }


        function saveItemFromCW(cw_chargecode) {
            if (!cw_chargecode) return null;

            try {
                var recordid = searchItemByCwCode(cw_chargecode.ChargeCode);

                var itemRec = recordid ? record.load({ type: record.Type.NON_INVENTORY_ITEM, id: recordid, isDynamic: true }) : record.create({ type: record.Type.NON_INVENTORY_ITEM, isDynamic: true });

                var org_itemid = itemRec.getValue('itemid');
                var org_displayname = itemRec.getValue('displayname');
                var org_subsidiary = itemRec.getValue('subsidiary');
                var org_iscagowise = itemRec.getValue('custitem_is_cargowise');
                var org_taxschedule = itemRec.getValue('taxschedule');
                var org_department = itemRec.getValue('department');
                var org_class = itemRec.getValue('class');
                var org_location = itemRec.getValue('location');
                // var org_purchasedescription = itemRec.getValue('purchasedescription');
                // var org_salesdescription = itemRec.getValue('salesdescription');
                // var org_stockdescription = itemRec.getValue('stockdescription');
                var org_incomeaccount = itemRec.getValue('incomeaccount');
                var org_expenseaccount = itemRec.getValue('expenseaccount');





                var need_to_save = false;

                if (cw_chargecode.ChargeCode != org_itemid) {
                    itemRec.setValue({ fieldId: 'itemid', value: cw_chargecode.ChargeCode, ignoreFieldChange: true });
                    need_to_save = true;
                }

                if (cw_chargecode.Description != org_displayname) {
                    itemRec.setValue({ fieldId: 'displayname', value: cw_chargecode.Description, ignoreFieldChange: true });
                    need_to_save = true;
                }

                // if(cw_chargecode.Description != org_purchasedescription) {
                //     itemRec.setValue({fieldId: 'purchasedescription', value: cw_chargecode.Description, ignoreFieldChange: true});    
                //     need_to_save = true;
                // }

                // if(cw_chargecode.Description != org_salesdescription) {
                //     itemRec.setValue({fieldId: 'salesdescription', value: cw_chargecode.Description, ignoreFieldChange: true});    
                //     need_to_save = true;
                // }

                // if(cw_chargecode.Description != org_stockdescription) {
                //     itemRec.setValue({fieldId: 'stockdescription', value: cw_chargecode.Description, ignoreFieldChange: true});    
                //     need_to_save = true;
                // }

                if (org_subsidiary != DEFAULT_SUBSIDiARY) {
                    itemRec.setValue({ fieldId: 'subsidiary', value: DEFAULT_SUBSIDiARY, ignoreFieldChange: true });//OpenRoad
                    need_to_save = true;
                }

                if (!org_iscagowise || !org_iscagowise) {
                    itemRec.setValue({ fieldId: 'custitem_is_cargowise', value: true, ignoreFieldChange: true });
                    need_to_save = true;
                }

                if (!org_taxschedule || org_taxschedule != DEFAULT_TAX_SCHEDULE) {
                    itemRec.setValue({ fieldId: 'taxschedule', value: DEFAULT_TAX_SCHEDULE, ignoreFieldChange: true });
                    need_to_save = true;
                }

                if (!org_department || org_department != DEPARTMENTS.Operations) {
                    itemRec.setValue({ fieldId: 'department', value: DEPARTMENTS.Operations, ignoreFieldChange: true });
                    need_to_save = true;
                }

                if (!org_class || org_class != BUSINESS_DEVISIONS.GlobalForwarding) {
                    itemRec.setValue({ fieldId: 'class', value: BUSINESS_DEVISIONS.GlobalForwarding, ignoreFieldChange: true });
                    need_to_save = true;
                }

                if (!org_location || org_location != LOCATIONS.GlobalForwarding) {
                    itemRec.setValue({ fieldId: 'location', value: LOCATIONS.GlobalForwarding, ignoreFieldChange: true });
                    need_to_save = true;
                }

                if (!org_incomeaccount == org_incomeaccount) {
                    //org_incomeaccount = DEFAULT_INCOME_ACCOUNT;
                    itemRec.setValue({ fieldId: 'incomeaccount', value: DEFAULT_INCOME_ACCOUNT, ignoreFieldChange: true });
                    need_to_save = true;
                }
                else if (!org_incomeaccount != org_incomeaccount) {
                    itemRec.setValue({ fieldId: 'incomeaccount', value: org_incomeaccount, ignoreFieldChange: true });
                    need_to_save = true;
                }

                if (!org_expenseaccount == org_expenseaccount) {
                    //org_expenseaccount = DEFAULT_EXPENSE_ACCOUNT;
                    itemRec.setValue({ fieldId: 'expenseaccount', value: DEFAULT_EXPENSE_ACCOUNT, ignoreFieldChange: true });
                    need_to_save = true;
                }
                else if (!org_expenseaccount != org_expenseaccount) {
                    itemRec.setValue({ fieldId: 'expenseaccount', value: org_expenseaccount, ignoreFieldChange: true });
                    need_to_save = true;
                }

                if (need_to_save) {
                    recordid = itemRec.save({ enableSourcing: false, ignoreMandatoryFields: false });
                    log.debug(cw_chargecode.ChargeCode + ' saved', recordid);
                }


                return recordid;
            }
            catch (e) {
                log.error('saveItemFromCW [customer code = ' + cw_chargecode.ChargeCode + ']', e);
            }
            return null;
        }

        function saveInvoiceFromCW(cw_invoiceinfo) {

            if (!cw_invoiceinfo) return null;

            var billCreditRef = cw_invoiceinfo.EventReference == "AP|CRD|Posted" ? "AP|CRD|Posted" : null;
            log.debug('Ref Object:', billCreditRef);

            var invoiceCreditRef = cw_invoiceinfo.EventReference == "AR|CRD|Posted" ? "AR|CRD|Posted" : null;
            log.debug('Ref Object:', invoiceCreditRef);


            try {
                var recordid = searchInvoiceByCwCode(cw_invoiceinfo.InvNumber);
                log.debug('existing invoice id', recordid);

                if (recordid && billCreditRef == null && invoiceCreditRef != null) {
                    return saveInvoiceCreditFromCW(cw_invoiceinfo.OriginalTransactionNumber);
                };

                preferredForm = '200';

                var trandate = cw_invoiceinfo.TransactionDate ? convertCWDateTimeToDate(cw_invoiceinfo.TransactionDate.toString()) : null;
                var duedate = cw_invoiceinfo.DueDate ? convertCWDateTimeToDate(cw_invoiceinfo.DueDate.toString()) : null;

                if (!recordid) {
                    var invoiceRec = record.create({ type: record.Type.INVOICE, id: 'invoice', isDynamic: true });


                    invoiceRec.setValue({ fieldId: 'externalid', value: cw_invoiceinfo.InvNumber, ignoreFieldChange: true });
                    invoiceRec.setValue({ fieldId: 'tranid', value: cw_invoiceinfo.InvNumber});
                    invoiceRec.setValue({ fieldId: 'entity', value: cw_invoiceinfo.CustomerInternalId });
                    invoiceRec.setValue({ fieldId: 'subsidiary', value: DEFAULT_SUBSIDiARY });    //OpenRoad
                    invoiceRec.setValue({ fieldId: 'account', value: DEFAULT_AR_ACCOUNT });    //Receivable Account Receivables : Accounts Receivable : Receivable
                    invoiceRec.setValue({ fieldId: 'location', value: LOCATIONS.GlobalForwarding });
                    invoiceRec.setValue({ fieldId: 'custbody_job_number', value: cw_invoiceinfo.InvNumber });
                    if (trandate) invoiceRec.setValue({ fieldId: 'trandate', value: trandate });
                    if (duedate) invoiceRec.setValue({ fieldId: 'duedate', value: duedate });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_job_invoicenumber', value: cw_invoiceinfo.JobInvoiceNumber });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_event_branch', value: cw_invoiceinfo.EventBranch });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_event_department', value: cw_invoiceinfo.EventDepartment });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_job_key', value: cw_invoiceinfo.JobKey });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_transaction_key', value: cw_invoiceinfo.TransactionKey.trim() });
                    invoiceRec.setValue({ fieldId: 'department', value: DEPARTMENTS.Operations });
                    invoiceRec.setValue({ fieldId: 'class', value: BUSINESS_DEVISIONS.GlobalForwarding });
                    invoiceRec.setValue({ fieldId: 'custbody_is_cargowise', value: true });
                    invoiceRec.setValue({ fieldId: 'custbody_bol', value: cw_invoiceinfo.ConsolKey });
                    invoiceRec.setValue({ fieldId: 'custbody_operations_rep', value: cw_invoiceinfo.OperationsStaff }); 
                    invoiceRec.setValue({ fieldId: 'custbody_or_sales_rep', value: cw_invoiceinfo.SalesStaff });
                    invoiceRec.setValue({ fieldId: 'custbody8', value: cw_invoiceinfo.WayBillNumber });


                    cw_invoiceinfo.Lines.forEach(function (ItemLine) {
                        invoiceRec.selectNewLine({ sublistId: 'item' });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: ItemLine.ItemId });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'price', value: '-1' });//Custom
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'rate', value: Number(ItemLine.SellOSAmount) });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: 1 });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_qbclass', value: 'GlobalForwarding' });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_orig_code', value: cw_invoiceinfo.PortOfOriginCode });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_orig_name', value: cw_invoiceinfo.PortOfOriginName });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_dest_code', value: cw_invoiceinfo.PortOfDestinationCode });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_destination_name', value: cw_invoiceinfo.PortOfDestinationName });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_dest_zip', value: cw_invoiceinfo.TransportModeCode });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_dest_ctry', value: cw_invoiceinfo.TransportModeDescription });
                        // invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_dest_valid', value: true });
                        // invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_orig_valid', value: true });
                        invoiceRec.commitLine({ sublistId: 'item' });
                    });

                    recordid = invoiceRec.save({ enableSourcing: false, ignoreMandatoryFields: false });
                    log.debug('invoice created', recordid);
                }
                else {
                    var invoiceRec = record.load({ type: record.Type.INVOICE, id: recordid, isDynamic: true });

                    invoiceRec.setValue({ fieldId: 'entity', value: cw_invoiceinfo.CustomerInternalId });
                    invoiceRec.setValue({ fieldId: 'account', value: DEFAULT_AR_ACCOUNT });
                    invoiceRec.setValue({ fieldId: 'custbody_is_cargowise', value: true });
                    invoiceRec.setValue({ fieldId: 'externalid', value: cw_invoiceinfo.InvoiceNumber });
                    if (trandate) invoiceRec.setValue({ fieldId: 'trandate', value: trandate });
                    if (duedate) invoiceRec.setValue({ fieldId: 'duedate', value: duedate });

                    for (var i = invoiceRec.getLineCount({ sublistId: 'item' }) - 1; i >= 0; i--) {
                        invoiceRec.removeLine({ sublistId: 'item', line: i, ignoreRecalc: true });
                    }

                    cw_invoiceinfo.Lines.forEach(function (ItemLine) {
                        invoiceRec.selectNewLine({ sublistId: 'item' });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: ItemLine.ItemId });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'price', value: '-1' });//Custom
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'rate', value: Number(ItemLine.SellOSAmount) });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: 1 });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_qbclass', value: 'GlobalForwarding' });
                        invoiceRec.commitLine({ sublistId: 'item' });
                    });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_job_invoicenumber', value: cw_invoiceinfo.JobInvoiceNumber });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_event_branch', value: cw_invoiceinfo.EventBranch });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_event_department', value: cw_invoiceinfo.EventDepartment });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_job_key', value: cw_invoiceinfo.JobKey });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_transaction_key', value: cw_invoiceinfo.TransactionKey.trim() });
                    invoiceRec.setValue({ fieldId: 'tranid', value: cw_invoiceinfo.InvNumber });
                    invoiceRec.setValue({ fieldId: 'department', value: DEPARTMENTS.Operations });
                    invoiceRec.setValue({ fieldId: 'location', value: LOCATIONS.GlobalForwarding });
                    invoiceRec.setValue({ fieldId: 'class', value: BUSINESS_DEVISIONS.GlobalForwarding });



                    recordid = invoiceRec.save({ enableSourcing: false, ignoreMandatoryFields: false });
                    log.debug('invoice saved', recordid);
                }



                return recordid;
            }
            catch (e) {
                log.error('saveInvoiceFromCW [Shipment code = ' + cw_invoiceinfo.InvoiceNumber + ']', e);
            }
            return null;
        }

        function convertCWDateTimeToDate(str) {
            var splt = str.split('T');
            if (splt && splt.length) {
                splt = splt[0].split('-');
                return new Date(Number(splt[0]), Number(splt[1]) - 1, Number(splt[2]));
            }
            return null;
        }

        function saveVendorBillFromCW(cw_invoiceinfo) {

            if (!cw_invoiceinfo) return null;

            var billCreditRef = cw_invoiceinfo.EventReference == "AP|CRD|Posted" ? "AP|CRD|Posted" : null;
            log.debug('Ref Object:', billCreditRef);

            var invoiceCreditRef = cw_invoiceinfo.EventReference == "AR|CRD|Posted" ? "AR|CRD|Posted" : null;
            log.debug('Ref Object:', invoiceCreditRef);

                if (cw_invoiceinfo && billCreditRef != null  && invoiceCreditRef == null) {
                    return saveVendorCreditFromCW(cw_invoiceinfo.InvNumber);
                };

            try {
                var recordid = searchVendorBillByCwCode(cw_invoiceinfo.InvNumber);

                var trandate = cw_invoiceinfo.TransactionDate ? convertCWDateTimeToDate(cw_invoiceinfo.TransactionDate.toString()) : null;
                var duedate = cw_invoiceinfo.DueDate ? convertCWDateTimeToDate(cw_invoiceinfo.DueDate.toString()) : null;

                if (!recordid) {
                    var invoiceRec = record.create({ type: record.Type.VENDOR_BILL, isDynamic: true });


                    invoiceRec.setValue({ fieldId: 'entity', value: cw_invoiceinfo.VendorInternalId });
                    invoiceRec.setValue({ fieldId: 'subsidiary', value: DEFAULT_SUBSIDiARY });//OpenRoad
                    invoiceRec.setValue({ fieldId: 'custbody_is_cargowise', value: true });
                    invoiceRec.setValue({ fieldId: 'account', value: DEFAULT_AP_ACCOUNT });    //Receivable Account Receivables : Accounts Receivable : Receivable
                    invoiceRec.setValue({ fieldId: 'externalid', value: cw_invoiceinfo.InvNumber });
                    invoiceRec.setValue({ fieldId: 'approvalstatus', value: '2' });//approved
                    if (trandate) invoiceRec.setValue({ fieldId: 'trandate', value: trandate });
                    if (duedate) invoiceRec.setValue({ fieldId: 'duedate', value: duedate });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_job_invoicenumber', value: cw_invoiceinfo.JobInvoiceNumber });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_event_branch', value: cw_invoiceinfo.EventBranch });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_event_department', value: cw_invoiceinfo.EventDepartment });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_job_key', value: cw_invoiceinfo.JobKey });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_transaction_key', value: cw_invoiceinfo.TransactionKey.trim() });
                    invoiceRec.setValue({ fieldId: 'tranid', value: cw_invoiceinfo.InvNumber });
                    invoiceRec.setValue({ fieldId: 'department', value: DEPARTMENTS.Operations });
                    invoiceRec.setValue({ fieldId: 'location', value: LOCATIONS.GlobalForwarding });
                    invoiceRec.setValue({ fieldId: 'class', value: BUSINESS_DEVISIONS.GlobalForwarding });
                    invoiceRec.setValue({ fieldId: 'custbody_or_load_number', value: cw_invoiceinfo.ConsolKey });
                    invoiceRec.setValue({ fieldId: 'custbody_job_number', value: cw_invoiceinfo.WayBillNumber });



                    cw_invoiceinfo.Lines.forEach(function (ItemLine) {

                        invoiceRec.selectNewLine({ sublistId: 'item' });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: ItemLine.ItemId });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'rate', value: Number(ItemLine.CostOSAmount) });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: 1 });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_orig_code', value: cw_invoiceinfo.PortOfOriginCode });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_orig_name', value: cw_invoiceinfo.PortOfOriginName });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_dest_code', value: cw_invoiceinfo.PortOfDestinationCode });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_destination_name', value: cw_invoiceinfo.PortOfDestinationName });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_dest_zip', value: cw_invoiceinfo.TransportModeCode });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_dest_ctry', value: cw_invoiceinfo.TransportModeDescription });
                        // invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_dest_valid', value: true });
                        // invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_orig_valid', value: true });
                        invoiceRec.commitLine({ sublistId: 'item' });
                    });

                    recordid = invoiceRec.save({ enableSourcing: false, ignoreMandatoryFields: false });
                    log.debug('Vendor Bill creation record', recordid);
                }
                else {
                    var invoiceRec = record.load({ type: record.Type.VENDOR_BILL, id: recordid, isDynamic: true });

                    invoiceRec.setValue({ fieldId: 'entity', value: cw_invoiceinfo.VendorInternalId, ignoreFieldChange: true });
                    invoiceRec.setValue({ fieldId: 'account', value: DEFAULT_AP_ACCOUNT });
                    invoiceRec.setValue({ fieldId: 'subsidiary', value: DEFAULT_SUBSIDiARY, ignoreFieldChange: true });//OpenRoad
                    invoiceRec.setValue({ fieldId: 'custbody_is_cargowise', value: true, ignoreFieldChange: true });
                    invoiceRec.setValue({ fieldId: 'externalid', value: cw_invoiceinfo.InvoiceNumber, ignoreFieldChange: true });
                    invoiceRec.setValue({ fieldId: 'approvalstatus', value: '2' });//approved
                    invoiceRec.setValue({ fieldId: 'custbody_cw_job_invoicenumber', value: cw_invoiceinfo.JobInvoiceNumber });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_event_branch', value: cw_invoiceinfo.EventBranch });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_event_department', value: cw_invoiceinfo.EventDepartment });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_job_key', value: cw_invoiceinfo.JobKey });
                    invoiceRec.setValue({ fieldId: 'custbody_cw_transaction_key', value: cw_invoiceinfo.TransactionKey.trim() });
                    invoiceRec.setValue({ fieldId: 'tranid', value: cw_invoiceinfo.InvNumber });
                    invoiceRec.setValue({ fieldId: 'department', value: DEPARTMENTS.Operations });
                    invoiceRec.setValue({ fieldId: 'location', value: LOCATIONS.GlobalForwarding });
                    invoiceRec.setValue({ fieldId: 'class', value: BUSINESS_DEVISIONS.GlobalForwarding });
                    invoiceRec.setValue({ fieldId: 'custbody_or_load_number', value: cw_invoiceinfo.ConsolKey }); // Consol #
                    invoiceRec.setValue({ fieldId: 'custbody_job_number', value: cw_invoiceinfo.WayBillNumber }); // House Bill #

                    if (trandate) invoiceRec.setValue({ fieldId: 'trandate', value: trandate });
                    if (duedate) invoiceRec.setValue({ fieldId: 'duedate', value: duedate });

                    for (var i = invoiceRec.getLineCount({ sublistId: 'item' }) - 1; i >= 0; i--) {
                        invoiceRec.removeLine({ sublistId: 'item', line: i, ignoreRecalc: true });
                    }

                    cw_invoiceinfo.Lines.forEach(function (ItemLine) {
                        invoiceRec.selectNewLine({ sublistId: 'item' });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: ItemLine.ItemId });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'rate', value: Number(ItemLine.CostOSAmount) });
                        invoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: 1 });
                        invoiceRec.commitLine({ sublistId: 'item' });
                    });



                    recordid = invoiceRec.save({ enableSourcing: false, ignoreMandatoryFields: false });
                    log.debug('Vendor bill created:', recordid);
                }


                return recordid;
            }
            catch (e) {
                log.error('saveVendorBillFromCW [Shipment code = ' + cw_invoiceinfo.InvoiceNumber + ']', e);
            }
            return null;
        };

        function saveUnbilledInvoiceFromCW(cw_invoiceinfo) {

            if (!cw_invoiceinfo) return null;

            try {

                var unbilledInvoice = searchInvoiceByCwCode(cw_invoiceinfo.InvNumber+'-UB');
                log.debug('Invoice ID?:', unbilledInvoice);

                var trandate = cw_invoiceinfo.TransactionDate ? convertCWDateTimeToDate(cw_invoiceinfo.TransactionDate.toString()) : null;
                var duedate = cw_invoiceinfo.DueDate ? convertCWDateTimeToDate(cw_invoiceinfo.DueDate.toString()) : null;

                var billCreditRef = cw_invoiceinfo.EventReference == "AP|CRD|Posted" ? "AP|CRD|Posted" : null;

                var invoiceCreditRef = cw_invoiceinfo.EventReference == "AR|CRD|Posted" ? "AR|CRD|Posted" : null;



                if (!unbilledInvoice && billCreditRef == null && invoiceCreditRef == null) {
                    var unbilledInvoiceRec = record.create({ type: record.Type.INVOICE, isDynamic: true });

                    unbilledInvoiceRec.setValue({ fieldId: 'entity', value: cw_invoiceinfo.CustomerInternalId });
                    unbilledInvoiceRec.setValue({ fieldId: 'subsidiary', value: DEFAULT_SUBSIDiARY });    //OpenRoad
                    unbilledInvoiceRec.setValue({ fieldId: 'custbody_is_cargowise', value: true });
                    unbilledInvoiceRec.setValue({ fieldId: 'account', value: DEFAULT_UNBILLED_ACCOUNT });    //Receivable Account Receivables : Accounts Receivable : Receivable
                    unbilledInvoiceRec.setValue({ fieldId: 'externalid', value: cw_invoiceinfo.InvNumber+'-UB', ignoreFieldChange: true });
                    if (trandate) unbilledInvoiceRec.setValue({ fieldId: 'trandate', value: trandate });
                    if (duedate) unbilledInvoiceRec.setValue({ fieldId: 'duedate', value: duedate });
                    unbilledInvoiceRec.setValue({ fieldId: 'custbody_cw_job_invoicenumber', value: cw_invoiceinfo.JobInvoiceNumber });
                    unbilledInvoiceRec.setValue({ fieldId: 'custbody_cw_event_branch', value: cw_invoiceinfo.EventBranch });
                    unbilledInvoiceRec.setValue({ fieldId: 'custbody_cw_event_department', value: cw_invoiceinfo.EventDepartment });
                    unbilledInvoiceRec.setValue({ fieldId: 'custbody_cw_job_key', value: cw_invoiceinfo.JobKey });
                    unbilledInvoiceRec.setValue({ fieldId: 'custbody_cw_transaction_key', value: cw_invoiceinfo.TransactionKey.trim() });
                    unbilledInvoiceRec.setValue({ fieldId: 'tranid', value: cw_invoiceinfo.InvNumber+'-UB' });
                    unbilledInvoiceRec.setValue({ fieldId: 'department', value: DEPARTMENTS.Operations });
                    unbilledInvoiceRec.setValue({ fieldId: 'location', value: LOCATIONS.GlobalForwarding });
                    unbilledInvoiceRec.setValue({ fieldId: 'class', value: BUSINESS_DEVISIONS.GlobalForwarding });
                    unbilledInvoiceRec.setValue({ fieldId: 'memo', value: 'Unbilled invoice' });
                    unbilledInvoiceRec.setValue({ fieldId: 'message', value: '4'});
                    unbilledInvoiceRec.setValue({ fieldId: 'custbody_bol', value: cw_invoiceinfo.ConsolKey });
                    unbilledInvoiceRec.setValue({ fieldId: 'custbody_job_number', value: cw_invoiceinfo.WayBillNumber });


                    cw_invoiceinfo.Lines.forEach(function (ItemLine) {
                        unbilledInvoiceRec.selectNewLine({ sublistId: 'item' });
                        //unbilledInvoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'expenseaccount', value: null });
                        if(ItemLine.ItemId == '3098') {
                            unbilledInvoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: '3977' });
                        }
                            else {
                        unbilledInvoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: '1383' });
                    }
                        unbilledInvoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'price', value: '1' });//Custom
                        unbilledInvoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'rate', value: Number(ItemLine.SellOSAmount) });
                        unbilledInvoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: 1 });
                        unbilledInvoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_qbclass', value: CLASS.GlobalForwarding });
                        unbilledInvoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'department', value: DEPARTMENTS.Operations });
                        // unbilledInvoiceRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'custcol_qbclass', value: CLASS.GlobalForwarding });

                        unbilledInvoiceRec.commitLine({ sublistId: 'item' });
                    });

                    unbilledInvoice = unbilledInvoiceRec.save({ enableSourcing: false, ignoreMandatoryFields: false });
                    log.debug('Unbilled invoice', unbilledInvoice);
                } return unbilledInvoice;
            }
            catch (e) {
                log.error('saveUnbilledInvoiceFromCW [Shipment code = ' + cw_invoiceinfo.InvoiceNumber + ']', e);
            }
            return null;
        };

        function saveInvoiceCreditFromCW(cw_invoiceinfo) {

            if (!cw_invoiceinfo) return null;

            var invoiceCredit = searchInvoiceByCwCode(cw_invoiceinfo.OriginalTransactionNumber);
            log.debug('Invoice found for credit creation:', invoiceCredit);
            log.debug('Original tran number:', cw_invoiceinfo.OriginalTransactionNumber);

            var billCreditRef = cw_invoiceinfo.EventReference == "AP|CRD|Posted" ? "AP|CRD|Posted" : null;
            var invoiceCreditRef = cw_invoiceinfo.EventReference == "AR|CRD|Posted" ? "AR|CRD|Posted" : null;



            try {
            

                var trandate = cw_invoiceinfo.TransactionDate ? convertCWDateTimeToDate(cw_invoiceinfo.TransactionDate.toString()) : null;
                var duedate = cw_invoiceinfo.DueDate ? convertCWDateTimeToDate(cw_invoiceinfo.DueDate.toString()) : null;
                

                if (invoiceCredit && invoiceCreditRef != null && billCreditRef == null) {

                    var invoiceCreditRec = record.create({ type: record.Type.CREDIT_MEMO, id: 'creditmemo', isDynamic: true });
                    log.debug('Creating INV CRD:', invoiceCreditRec);

                    var getRecord = record.load({ type: record.Type.INVOICE, id: invoiceCredit, isDynamic: true });
                    var thisDate = getRecord.getValue({ fieldId: 'postingperiod' });
                    log.debug('getRecord value:', getRecord);

                    var preferredForm = '180';
                    var currencytype = 'USD';
                    var exchangerate = Number(1.00);



                    invoiceCreditRec.setValue({ fieldId: 'entity', value: cw_invoiceinfo.CustomerInternalId });
                    invoiceCreditRec.setValue({ fieldId: 'subsidiary', value: DEFAULT_SUBSIDiARY });    //OpenRoad
                    invoiceCreditRec.setValue({ fieldId: 'account', value: DEFAULT_UNBILLED_ACCOUNT });    //Receivable Account Receivables : Accounts Receivable : Receivable
                    invoiceCreditRec.setValue({ fieldId: 'message', value: 4 }); // It's been a pleasure working with you!
                    if (trandate) invoiceCreditRec.setValue({ fieldId: 'trandate', value: trandate });
                    if (duedate) invoiceCreditRec.setValue({ fieldId: 'duedate', value: duedate });
                    invoiceCreditRec.setValue({ fieldId: 'refnum', value: cw_invoiceinfo.OriginalTransactionNumber });
                    invoiceCreditRec.setValue({ fieldId: 'createdfrom', value: getRecord.id });
                    invoiceCreditRec.setValue({ fieldId: 'currency', value: currencytype });
                    invoiceCreditRec.setValue({ fieldId: 'customform', value: preferredForm });
                    invoiceCreditRec.setValue({ fieldId: 'exchangeRate', value: exchangerate });
                    invoiceCreditRec.setValue({ fieldId: 'autoapply', value: false });
                    invoiceCreditRec.setValue({ fieldId: 'postingperiod', value: thisDate });
                    invoiceCreditRec.setValue({ fieldId: 'otherrefnum', value: cw_invoiceinfo.OriginalTransactionNumber });
                    invoiceCreditRec.setValue({ fieldId: 'custbody_is_cargowise', value: true });
                    invoiceCreditRec.setValue({ fieldId: 'custbody_cw_job_key', value: cw_invoiceinfo.JobKey });
                    invoiceCreditRec.setValue({ fieldId: 'tranid', value: invoiceCredit });
                    invoiceCreditRec.setValue({ fieldId: 'externalid', value: invoiceCredit, ignoreFieldChange: true });
                    invoiceCreditRec.setValue({ fieldId: 'custbody_bol', value: cw_invoiceinfo.ConsolKey }); // Consol number
                    invoiceCreditRec.setValue({ fieldId: 'custbody_job_number', value: cw_invoiceinfo.WayBillNumber }); // Waybill Number

                    cw_invoiceinfo.Lines.forEach(function (ItemLine) {
                        invoiceCreditRec.selectLine({ sublistId: 'item', line: 0 });
                        invoiceCreditRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: ItemLine.ItemId });
                        invoiceCreditRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'rate', value: Math.abs(ItemLine.SellOSAmount) });
                        invoiceCreditRec.commitLine({ sublistId: 'item' });
                    });

                    invoiceCredit = invoiceCreditRec.save({ enableSourcing: false, ignoreMandatoryFields: false });
                    log.debug('Invoice Credit', invoiceCredit);
                    }  
                    return invoiceCredit;
            }
            catch (e) {
                log.error('Save Credit [Shipment code = ' + cw_invoiceinfo.InvoiceNumber, e);
            }
            return null;
        };



        function saveVendorCreditFromCW(cw_invoiceinfo) {

            if (!cw_invoiceinfo) return null;

            var vendorCredit = searchVendorBillByCwCode(cw_invoiceinfo.InvNumber);
            log.debug('Vendor Credit found Bill ID:', vendorCredit);

            var billCreditRef = cw_invoiceinfo.EventReference == "AP|CRD|Posted" ? "AP|CRD|Posted" : null;
            log.debug('Bill Cred Ref data:', billCreditRef);

            try {

                var trandate = cw_invoiceinfo.TransactionDate ? convertCWDateTimeToDate(cw_invoiceinfo.TransactionDate.toString()) : null;
                var duedate = cw_invoiceinfo.DueDate ? convertCWDateTimeToDate(cw_invoiceinfo.DueDate.toString()) : null;

                if (vendorCredit && billCreditRef != null) {

                    var vendorCreditRec = record.create({ type: record.Type.VENDOR_CREDIT, id: 'vendorcredit', isDynamic: true });
                    log.debug('Creating AP CRD:', vendorCreditRec);

                    var grabbingRecord = record.load({ type: record.Type.VENDOR_BILL, id: vendorCredit, isDynamic: true });
                    var retrieveDate = grabbingRecord.getValue({ fieldId: 'postingperiod' });
                    log.debug('Retrieved date', retrieveDate);

                    var preferredForm = '48';
                    var currencytype = 'USD';
                    var exchangerate = Number(1.00);

                    
                    vendorCreditRec.setValue({ fieldId: 'autoapply', value: false });
                    vendorCreditRec.setValue({ fieldId: 'entity', value: cw_invoiceinfo.VendorInternalId });
                    vendorCreditRec.setValue({ fieldId: 'subsidiary', value: DEFAULT_SUBSIDiARY });    //OpenRoad
                    vendorCreditRec.setValue({ fieldId: 'externalid', value: vendorCredit, ignoreFieldChange: true });
                    if (trandate) vendorCreditRec.setValue({ fieldId: 'trandate', value: trandate });
                    if (duedate) vendorCreditRec.setValue({ fieldId: 'duedate', value: duedate });
                    vendorCreditRec.setValue({ fieldId: 'currency', value: currencytype });
                    vendorCreditRec.setValue({ fieldId: 'customform', value: preferredForm });
                    vendorCreditRec.setValue({ fieldId: 'exchangeRate', value: exchangerate });
                    vendorCreditRec.setValue({ fieldId: 'usertotal', value: cw_invoiceinfo.CostOSAmount });
                    vendorCreditRec.setValue({ fieldId: 'amount', value: cw_invoiceinfo.CostOSAmount });
                    vendorCreditRec.setValue({ fieldId: 'location', value: LOCATIONS.GlobalForwarding });
                    vendorCreditRec.setValue({ fieldId: 'createdfrom', value: vendorCredit });
                    vendorCreditRec.setValue({ fieldId: 'postingperiod', value: retrieveDate });
                    vendorCreditRec.setValue({ fieldId: 'custbody_is_cargowise', value: true });
                    vendorCreditRec.setValue({ fieldId: 'custbody_cw_job_key', value: cw_invoiceinfo.JobInvoiceNumber });
                    vendorCreditRec.setValue({ fieldId: 'tranid', value: vendorCredit });
                    vendorCreditRec.setValue({ fieldId: 'memo', value: cw_invoiceinfo.ConsolKey });
                    vendorCreditRec.setValue({ fieldId: 'custbody_or_load_number', value: cw_invoiceinfo.JobKey });
                    vendorCreditRec.setValue({ fieldId: 'custbody_job_number', value: cw_invoiceinfo.WayBillNumber }); // Waybill Number

                    cw_invoiceinfo.Lines.forEach(function (ItemLine) {
                        vendorCreditRec.selectLine({ sublistId: 'item', line: 0 });
                        vendorCreditRec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: ItemLine.ItemId });
                        vendorCreditRec.commitLine({ sublistId: 'item' });
                    });

                    vendorCredit = vendorCreditRec.save({ enableSourcing: false, ignoreMandatoryFields: false });
                    log.debug('Vendor Credit', vendorCredit);
                    }  
                    return vendorCredit;
            }
            catch (e) {
                log.error('saveVendorCreditFromCW [Shipment code = ' + cw_invoiceinfo.InvNumber, e);
            }
            return null;
        };


        return {
            saveCustomerFromCW: saveCustomerFromCW,
            saveVendorFromCW: saveVendorFromCW,
            searchCustomerByCwCode: searchCustomerByCwCode,
            searchVendorByCwCode: searchVendorByCwCode,
            searchItemByCwCode: searchItemByCwCode,
            saveItemFromCW: saveItemFromCW,
            saveInvoiceFromCW: saveInvoiceFromCW,
            saveVendorBillFromCW: saveVendorBillFromCW,
            getPaymentXML: getPaymentXML,
            saveUnbilledInvoiceFromCW: saveUnbilledInvoiceFromCW,
            //saveUnbilledCreditFromCW: saveUnbilledCreditFromCW,
            saveVendorCreditFromCW: saveVendorCreditFromCW,
            saveInvoiceCreditFromCW: saveInvoiceCreditFromCW,
        };

    });