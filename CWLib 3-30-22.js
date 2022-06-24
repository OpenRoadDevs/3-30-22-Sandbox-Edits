/**
 * @NApiVersion 2.x
 */
 define(['N/https', 'N/http', 'N/xml', 'N/encode', 'N/file', 'N/compress'],

 function (https, http, xml, encode, file, compress) {

     const CW_USERNAME = 'OP1DAETRN';

     const CW_OBJECT_TYPES = {
         'Organization': {
             EntityName: 'OrgHeader',
             Fields: [
                 { Name: 'Code' },
                 { Name: 'IsActive' },
                 { Name: 'FullName' },
                 { Name: 'IsConsignee' },
                 { Name: 'IsConsignor' },
                 { Name: 'IsTransportClient' },
                 { Name: 'IsWarehouseClient' },
                 { Name: 'IsForwarder' },
                 { Name: 'IsShippingProvider' },
                 { Name: 'IsAirWholesaler' },
                 { Name: 'IsSeaWholesaler' },
                 { Name: 'IsRailProvider' },
                 { Name: 'IsLineHaulProvider' },
                 { Name: 'IsMiscFreightServices' },
                 { Name: 'IsAirCTO' },
                 { Name: 'IsAirLine' },
                 { Name: 'IsBroker' },
                 { Name: 'IsContainerYard' },
                 { Name: 'IsLocalTransport' },
                 { Name: 'IsPackDepot' },
                 { Name: 'IsSeaCTO' },
                 { Name: 'IsShippingLine' },
                 { Name: 'IsUnpackDepot' },
                 { Name: 'IsRailHead' },
                 { Name: 'IsRoadFreightDepot' },
                 { Name: 'IsShippingConsortium' },
                 { Name: 'IsFumigationContractor' },
                 { Name: 'IsGlobalAccount' },
                 { Name: 'IsNationalAccount' },
                 { Name: 'IsSalesLead' },
                 { Name: 'IsCompetitor' },
                 { Name: 'IsTempAccount' },
                 { Name: 'IsPersonalEffectsAccount' },
                 { Name: 'IsDistributionCentre' },
             ],
             Collections: [
                 {
                     Name: 'OrgAddress',
                     Fields: [
                         { Name: 'IsActive' },
                         { Name: 'Code' },
                         { Name: 'Address1' },
                         { Name: 'Address2' },
                         { Name: 'City' },
                         { Name: 'State' },
                         { Name: 'PostCode' },
                         { Name: 'Phone' },
                         { Name: 'CompanyNameOverride' },
                         { Name: 'CountryCode' },
                         { Name: 'PK' },
                         { Name: 'Email' }
                     ]
                 },
                 {
                     Name: 'OrgContact',
                     Fields: [
                         { Name: 'PK' },
                         { Name: 'IsActive' },
                         { Name: 'ContactName' },
                         { Name: 'Language' },
                         { Name: 'NotifyMode' },
                         { Name: 'Title' },
                         { Name: 'Gender' },
                         { Name: 'JobCategory' },
                         { Name: 'Phone' },
                         { Name: 'PhoneExtension' },
                         { Name: 'Fax' },
                         { Name: 'Mobile' },
                         { Name: 'Pager' },
                         { Name: 'OtherPhone' },
                         { Name: 'HomePhone' },
                         { Name: 'Email' },
                     ]
                 }
             ]
         },
         'ForwardingShipment': {
             Fields: [
                 { Name: 'DocumentedWeight' },
                 { Name: 'TotalWeight' },
                 { Name: 'TotalWeightUnit' },
                 { Name: 'WayBillNumber' },
                 { Name: 'JobCosting' },


             ],
             Collections: [
                 {
                     Name: 'DataSource',
                     Fields: [
                         { Name: 'Key' },
                         { Name: 'Type' },
                     ]
                 },
                 {
                    Name: 'OperationsStaff',
                    Fields: [
                        { Name: 'Name' },
                    ]
                },
                {
                    Name: 'SalesStaff',
                    Fields: [
                        { Name: 'Name' },
                    ]
                },
                 {
                     Name: 'OriginalReference',
                     Fields: [
                         { Name: 'OriginalTransactionNumber' },
                     ]
                 },
                 {
                     Name: 'PortOfOrigin',
                     Fields: [
                         { Name: 'Code' },
                         { Name: 'Name' },
                     ]
                 },
                 {
                     Name: 'PortOfDestination',
                     Fields: [
                         { Name: 'Code' },
                         { Name: 'Name' },
                     ]
                 },
                 {
                    Name: 'TransportMode',
                    Fields: [
                        { Name: 'Code' },
                        { Name: 'Description' },
                    ]
                },
                    {
                     Name: 'OrganizationAddress',
                     Fields: [
                         { Name: 'AddressType' },
                         { Name: 'IsActive' },
                         { Name: 'Code' },
                         { Name: 'Address1' },
                         { Name: 'Address2' },
                         { Name: 'City' },
                         { Name: 'State' },
                         { Name: 'PostCode' },
                         { Name: 'Phone' },
                         { Name: 'CompanyNameOverride' },
                         { Name: 'CountryCode' },
                         { Name: 'PK' },
                         { Name: 'Email' },
                         { Name: 'OrganizationCode' },
                     ]
                 },
                 {
                     Name: 'ChargeLine',
                     Fields: [
                         { Name: 'ChargeCode' },
                         { Name: 'ChargeCodeGroup' },
                         { Name: 'CostAPInvoiceNumber' },
                         { Name: 'CostDueDate' },
                         { Name: 'CostExchangeRate' },
                         { Name: 'CostInvoiceDate' },
                         { Name: 'CostIsPosted' },
                         { Name: 'CostLocalAmount' },
                         { Name: 'CostOSAmount' },
                         { Name: 'CostOSCurrency' },
                         { Name: 'Creditor' },
                         { Name: 'Debtor' },
                         { Name: 'Department' },
                         { Name: 'Description' },
                         { Name: 'DisplaySequence' },
                         { Name: 'SellExchangeRate' },
                         { Name: 'SellInvoiceType' },
                         { Name: 'SellIsPosted' },
                         { Name: 'SellLocalAmount' },
                         { Name: 'SellOSAmount' },
                         { Name: 'SellOSCurrency' },
                         { Name: 'SellOSGSTVATAmount' },
                         { Name: 'SellExchangeRate' },
                         { Name: 'SellPostedTransactionNumber' },
                         { Name: 'SellPostedTransactionType' },
                     ]
                 }
             ]
         }
     };

     var API_CONF = {
         is_prod: false,
         prod: {
             url: 'https://op1prdservices.wisegrid.net/eAdaptor',
             recipient_id: 'OP1DAEPRD',
             sender_id: 'admin',
             password: 'admin',
         },
         train: {
             url: 'https://op1trnservices.wisegrid.net/eAdaptor',
             recipient_id: 'OP1DAETRN',
             sender_id: 'train',
             password: 'train',
         }
     };



     function saveTOXML(filename, xmlFileContent) {
         var fileObj = file.create({
             name: filename,
             fileType: file.Type.XMLDOC,
             contents: xmlFileContent
         });

        //  fileObj.folder = 1729;//File Cabinet -> Temp
        //  var fileId = fileObj.save();

         fileObj.folder = 16850;//File Cabinet -> Temp
         var fileId = fileObj.save();
     }

     function request(xmlcontent, need_to_compress) {
         var _logtitle = 'request';
         log.debug('xmlcontent from Lib', xmlcontent);
         try {
             var serverURL = API_CONF.is_prod ? API_CONF.prod.url : API_CONF.train.url;

             var apikey = encode.convert({
                 string: API_CONF.is_prod ? API_CONF.prod.sender_id + ':' + API_CONF.prod.password : API_CONF.train.sender_id + ':' + API_CONF.train.password,
                 inputEncoding: encode.Encoding.UTF_8,
                 outputEncoding: encode.Encoding.BASE_64
             });

             var headerObj = {
                 Authorization: "Basic " + apikey,
                 // 'Content-Type': 'application/gzip'
             };

             // Try adding [0] after xmlcontent, to check if each record will pass through via XML
             var bodyContent = xmlcontent;
             log.debug('bodyContent', bodyContent);
            

             var response = https.post({ url: serverURL, headers: headerObj, body: bodyContent });
             

             if (!response) throw new Error('[NETWORK ERROR] Failed to request!');

             if (response.code != '200') throw new Error('[SERVER ERROR]' + ' Error Code = ' + response.code + ', Error Message = ' + response.body);

             return response.body;
             
         }
         catch (e) {
             log.error(_logtitle, e);
         }

         return null;
     }

     function parseXML(xmlFileContent) {

         try {

             var xmlDocument = xml.Parser.fromString({
                 text: xmlFileContent
             });
             var bookNode = xml.XPath.select({ node: xmlDocument, xpath: '//s:Envelope' });
             // log.debug('bookNode', bookNode);

             if (!bookNode.length) throw new Error('Invalid XML');

             // for (var i = 0; i < bookNode.length; i++) {
             for (var i = 0; i < 1; i++) {
                 // log.debug(i, bookNode[i]);
                 // var title = bookNode[i].firstChild.nextSibling.textContent;
                 //** parse xml header */
                 var nodeHeader = bookNode[i].getElementsByTagName({ tagName: 's:Header' })[0];
                 // log.debug('nodeHeader', nodeHeader);
                 if (!nodeHeader) continue;

                 var _sendStreamRequestTrackingID = nodeHeader.getElementsByTagName({ tagName: 'h:SendStreamRequestTrackingID' })[0].textContent;
                 // log.debug('_sendStreamRequestTrackingID', _sendStreamRequestTrackingID);

                 var securityNode = nodeHeader.getElementsByTagName({ tagName: 'o:Security' })[0];
                 // log.debug('securityNode', securityNode);
                 if (!securityNode) continue;

                 var _userName = securityNode.getElementsByTagName({ tagName: 'o:Username' })[0].textContent;
                 var _password = securityNode.getElementsByTagName({ tagName: 'o:Password' })[0].textContent;

                 var _timeCreated = securityNode.getElementsByTagName({ tagName: 'u:Created' })[0].textContent;
                 var _timeExpires = securityNode.getElementsByTagName({ tagName: 'u:Expires' })[0].textContent;
                 // log.debug('_userName', _userName);
                 // log.debug('_password', _password);

                 //** parse xml body */
                 var nodeBody = bookNode[i].getElementsByTagName({ tagName: 's:Body' })[0];
                 // log.debug('nodeBody', nodeBody);

                 var sendStreamRequestNode = nodeBody.getElementsByTagName({ tagName: 'SendStreamRequest' })[0];
                 if (!sendStreamRequestNode) continue;
                 // log.debug('sendStreamRequestNode', sendStreamRequestNode);

                 var payloadNode = sendStreamRequestNode.getElementsByTagName({ tagName: 'Payload' })[0]
                 if (!payloadNode) continue;
                 // log.debug('payloadNode', payloadNode);

                 var messageNode = payloadNode.getElementsByTagName({ tagName: 'Message' });
                 if (!messageNode) continue;
                 // log.debug('messageNode', messageNode);

                 var obj = {
                     _sendStreamRequestTrackingID: _sendStreamRequestTrackingID,
                     _userName: _userName,
                     _password: _password,
                     // requestHeaderObject: nodeHeader,
                     _timeCreated: _timeCreated,
                     _timeExpires: _timeExpires,
                     messageList: [],
                 };
                 for (var k = 0; k < messageNode.length; k++) {
                     // log.debug('message#'+k, messageNode[k]);

                     var _attrApplicationCode = messageNode[k].getAttribute({ name: 'ApplicationCode' });
                     var _attrClientID = messageNode[k].getAttribute({ name: 'ClientID' });
                     var _attrTrackingID = messageNode[k].getAttribute({ name: 'TrackingID' });
                     var _attrSchemaName = messageNode[k].getAttribute({ name: 'SchemaName' });
                     var _attrSchemaType = messageNode[k].getAttribute({ name: 'SchemaType' });
                     var _attrFileName = messageNode[k].getAttribute({ name: 'FileName' });
                     var _attrEmailSubject = messageNode[k].getAttribute({ name: 'EmailSubject' });
                     var message = messageNode[k].textContent;
                     // log.debug('message#'+k+' text', message);

                     // log.debug('decodedMsg', decodedMsg);

                     var fileObj = file.create({
                         name: (_attrTrackingID + '_' + _attrClientID + '.gzip'),
                         fileType: file.Type.GZIP,
                         contents: message
                     });

                     var gunzippedFile = compress.gunzip({ file: fileObj });

                     // log.debug('Contents: ' + gunzippedFile.getContents());

                     var decodedMsg = encode.convert({
                         string: gunzippedFile.getContents(),
                         inputEncoding: encode.Encoding.BASE_64,
                         outputEncoding: encode.Encoding.UTF_8
                     });
                     // log.debug('decodedMsg', decodedMsg);

                     obj.messageList.push({
                         message: decodedMsg,
                         _attrApplicationCode: _attrApplicationCode,
                         _attrClientID: _attrClientID,
                         _attrTrackingID: _attrTrackingID,
                         _attrSchemaName: _attrSchemaName,
                         _attrSchemaType: _attrSchemaType,
                         _attrFileName: _attrFileName,
                         _attrEmailSubject: _attrEmailSubject,
                     });

                     // var fileId = fileObj.save();
                 }
                 return obj;
             }
         }
         catch (e) {
             log.error('parseXML err', e);
         }

         return null;
     }

     function parseUniversalInterchangeXML(xmlFileContent) {
         try {
             var xmlString = xmlFileContent.replace("http://www.cargowise.com/Schemas/Universal/2011/11", "");
             var xmlString = xmlString.replace("http://www.cargowise.com/Schemas/Native/2011/11", "");

             var xmlDocument = xml.Parser.fromString({ text: xmlString });

             //parsing header
             var headerNode = xml.XPath.select({
                 node: xmlDocument,
                 xpath: '//Header'
             });

             if (!headerNode || !headerNode.length) throw new Error("No Header");

             headerNode = headerNode[0];

             var senderIDTag = headerNode.getElementsByTagName({ tagName: 'SenderID' });
             var recipientIDTag = headerNode.getElementsByTagName({ tagName: 'RecipientID' });

             if (!senderIDTag || !senderIDTag.length) throw new Error("No SenderID in Header");

             if (!recipientIDTag || !recipientIDTag.length) throw new Error("No RecipientID ID in Header");

             if (senderIDTag[0].textContent != CW_USERNAME) throw new Error("Invalid User");
             //parsing body
             var bodyNode = xml.XPath.select({
                 node: xmlDocument,
                 xpath: '//Body'
             });

             if (!bodyNode || !bodyNode.length) throw new Error("No body");

             // log.debug('bodyNode', bodyNode);

             bodyNode = bodyNode[0];

             //DataSourceCollection
             var dataSourceCollection = bodyNode.getElementsByTagName({ tagName: 'DataSourceCollection' });
             // log.debug('dataSourceCollection', dataSourceCollection);

             if (!dataSourceCollection || !dataSourceCollection.length) throw new Error("No DataSourceCollection");

             dataSourceCollection = dataSourceCollection[0];

             var dataSource = dataSourceCollection.getElementsByTagName({ tagName: 'DataSource' });

             if (!dataSource || !dataSource.length) throw new Error("No DataSource");

             dataSource = dataSource[0];

             var dataSourceTypeTag = dataSource.getElementsByTagName({ tagName: 'Type' });
             var dataSourceKeyTag = dataSource.getElementsByTagName({ tagName: 'Key' });


             // Debtor Collection
            //  var Debtor = bodyNode.getElementsByTagName({ tagName: 'Debtor' });
             
            //  UBDebtor = Debtor[1].textContent;
            //  log.debug('Debtor info:', UBDebtor);
  

             // OriginalTransactionNumber
             var originalReference = bodyNode.getElementsByTagName({ tagName: 'OriginalReference'});

             var OriginalTransactionNumber = null;
             if (originalReference && originalReference.length) {
                 OriginalTransactionNumber = originalReference[0].getElementsByTagName({ tagName: 'OriginalTransactionNumber'});
             }

             // Start of JobCosting element

             var jobCosting = bodyNode.getElementsByTagName({ tagName: 'JobCosting'});
             jobCosting = jobCosting[0];
             var OperationsStaff = jobCosting.getElementsByTagName({tagName: 'OperationsStaff'});
             var SalesStaff = jobCosting.getElementsByTagName({tagName: 'SalesStaff'});
             var WayBillNumber = bodyNode.getElementsByTagName({tagName: 'WayBillNumber'});


             // Port of Destination

             var PortOfDestination = bodyNode.getElementsByTagName({ tagName: 'PortOfDestination' });

             var PortOfDestinationCode = null;
             var PortOfDestinationName = null;
             if (PortOfDestination && PortOfDestination.length) {
                PortOfDestinationCode = PortOfDestination[0].getElementsByTagName({ tagName: 'Code' });
                PortOfDestinationName = PortOfDestination[0].getElementsByTagName({ tagName: 'Name' });
             }

            // Port of Origin

             var PortOfOrigin = bodyNode.getElementsByTagName({ tagName: 'PortOfOrigin' });

             var PortOfOriginCode = null;
             var PortOfOriginName = null;
             if (PortOfOrigin && PortOfOrigin.length) {
                PortOfOriginCode = PortOfOrigin[0].getElementsByTagName({ tagName: 'Code' });
                PortOfOriginName = PortOfOrigin[0].getElementsByTagName({ tagName: 'Name' });
             }

            // Port of Origin

             var TransportMode = bodyNode.getElementsByTagName({ tagName: 'TransportMode' });

             var TransportModeCode = null;
             var TransportModeDescription = null;
             if (TransportMode && TransportMode.length) {
                TransportModeCode = TransportMode[0].getElementsByTagName({ tagName: 'Code' });
                TransportModeDescription = TransportMode[0].getElementsByTagName({ tagName: 'Description' });
             }            
             
             //ActionPurpose
             var actionPurpose = bodyNode.getElementsByTagName({ tagName: 'ActionPurpose' });
             
             var actionPurposeCodeTag = null;
             var actionPurposeDescriptionTag = null;
             if (actionPurpose && actionPurpose.length) {
                 actionPurposeCodeTag = actionPurpose[0].getElementsByTagName({ tagName: 'Code' });
                 actionPurposeDescriptionTag = actionPurpose[0].getElementsByTagName({ tagName: 'Description' });
             }
 
             //Company
             var company = bodyNode.getElementsByTagName({ tagName: 'Company' });
             
             var companyCodeTag = null;
             var companyNameTag = null;
             var companyCountryTag = null;
             if (company && company.length) {
                 companyCodeTag = company[0].getElementsByTagName({ tagName: 'Code' });
                 companyCountryTag = company[0].getElementsByTagName({ tagName: 'Country' });
                 companyNameTag = company[0].getElementsByTagName({ tagName: 'Name' });
             }
 
             //Parse UniversalTransaction
             if (dataSourceTypeTag && dataSourceTypeTag.length && dataSourceTypeTag[0].textContent == 'AccountingInvoice') {
                 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'JobInvoiceNumber' });
                 var JobInvoiceNumber = eleTag[0].textContent;
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'Job' });
                 var JobKey = '';
                 if (eleTag && eleTag.length) {
                     var eleTag1 = eleTag[0].getElementsByTagName({ tagName: 'Key' });
                     if (eleTag1 && eleTag1.length) JobKey = eleTag1[0].textContent;
                     // else {
                     //     eleTag1 = eleTag[0].getElementsByTagName({ tagName: 'Type' });
                     //     if (eleTag1 && eleTag1.length) JobKey = eleTag1[0].textContent;
                     // }
                 }

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'Debtor' });
                 var UBDebtor = '';
                 if (eleTag && eleTag.length) {
                    UBDebtor = eleTag[0].getElementsByTagName({ tagName: 'Key' })[0].textContent;
                 }

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'DataSource' });
                 var ConsolKey = '';
                 if (eleTag && eleTag.length) {
                     var eleTag1 = eleTag[1].getElementsByTagName({ tagName: 'Key' })
                     if (eleTag1 && eleTag1.length) ConsolKey = eleTag1[0].textContent;
                 }
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'Company' });
                 var CompanyCode = '';
                 if (eleTag && eleTag.length) {
                     CompanyCode = eleTag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                 }
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'EventBranch' });
                 var EventBranch = '';
                 if (eleTag && eleTag.length) {
                     EventBranch = eleTag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                 }
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'EventDepartment' });
                 var EventDepartment = '';
                 if (eleTag && eleTag.length) {
                     EventDepartment = eleTag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                 }
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'EventType' });
                 var EventType = '';
                 if (eleTag && eleTag.length) {
                     EventType = eleTag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                 }
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'EventUser' });
                 var EventUser = '';
                 if (eleTag && eleTag.length) {
                     EventUser = eleTag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                 }

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'OriginalReference' });
                 var OriginalTransactionNumber = '';
                 if (eleTag && eleTag.length) {
                     OriginalTransactionNumber = eleTag[0].getElementsByTagName({ tagName: 'OriginalTransactionNumber' })[0].textContent;
                 }

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'PortOfDestination' });
                 var PortOfDestinationCode = '';
                 if (eleTag && eleTag.length) {
                    PortOfDestinationCode = eleTag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                 }

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'PortOfDestination' });
                 var PortOfDestinationName = '';
                 if (eleTag && eleTag.length) {
                    PortOfDestinationName = eleTag[0].getElementsByTagName({ tagName: 'Name' })[0].textContent;
                 }

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'PortOfOrigin' });
                 var PortOfOriginCode = '';
                 if (eleTag && eleTag.length) {
                    PortOfOriginCode = eleTag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                 }

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'PortOfOrigin' });
                 var PortOfOriginName = '';
                 if (eleTag && eleTag.length) {
                    PortOfOriginName = eleTag[0].getElementsByTagName({ tagName: 'Name' })[0].textContent;
                 }

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'TransportMode' });
                 var TransportModeCode = '';
                 if (eleTag && eleTag.length) {
                    TransportModeCode = eleTag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                 }

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'TransportMode' });
                 var TransportModeDescription = '';
                 if (eleTag && eleTag.length) {
                    TransportModeDescription = eleTag[0].getElementsByTagName({ tagName: 'Description' })[0].textContent;
                 }
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'EventReference' });
                 var EventReference = eleTag && eleTag.length ? eleTag[0].textContent : '';
                 var EventReferenceObject = {};
                 if (EventReference != '') {
                     EventReference.split('|').forEach(function (EventCode) {
                         EventReferenceObject[EventCode] = EventCode;
                     });
                 }
                 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'OrganizationAddress' });
                 var OrganizationAddress = null;
                 if (eleTag && eleTag.length) {
                     OrganizationAddress = {
                         AddressType: eleTag[0].getElementsByTagName({ tagName: 'AddressType' })[0].textContent,
                         Address1: eleTag[0].getElementsByTagName({ tagName: 'Address1' })[0].textContent,
                         Address2: eleTag[0].getElementsByTagName({ tagName: 'Address2' })[0].textContent,
                         AddressOverride: eleTag[0].getElementsByTagName({ tagName: 'AddressOverride' })[0].textContent,
                         AddressShortCode: eleTag[0].getElementsByTagName({ tagName: 'AddressShortCode' })[0].textContent,
                         City: eleTag[0].getElementsByTagName({ tagName: 'City' })[0].textContent,
                         Country: eleTag[0].getElementsByTagName({ tagName: 'Country' })[0].getElementsByTagName({ tagName: 'Code' })[0].textContent,
                         Email: eleTag[0].getElementsByTagName({ tagName: 'Email' })[0].textContent,
                         Fax: eleTag[0].getElementsByTagName({ tagName: 'Fax' })[0].textContent,
                         OrganizationCode: eleTag[0].getElementsByTagName({ tagName: 'OrganizationCode' })[0].textContent,
                         Phone: eleTag[0].getElementsByTagName({ tagName: 'Phone' })[0].textContent,
                         Postcode: eleTag[0].getElementsByTagName({ tagName: 'Postcode' })[0].textContent,
                         State: eleTag[0].getElementsByTagName({ tagName: 'State' })[0].textContent,
                     };
                 }
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'TransactionType' });
                 var TransactionType = eleTag && eleTag.length ? eleTag[0].textContent : '';
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'LocalCurrency' });
                 var LocalCurrency = '';
                 if (eleTag && eleTag.length) {
                     LocalCurrency = eleTag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                 }
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'OrganizationAddress' });
                 var OrganizationCode = '';
                 if (eleTag && eleTag.length) {
                     OrganizationCode = eleTag[0].getElementsByTagName({ tagName: 'OrganizationCode' })[0].textContent;
                 }
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'TriggerDate' });
                 var TriggerDate = eleTag && eleTag.length ? eleTag[0].textContent : '';

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'Shipment'});
                 var WayBillNumber = '';
                 if (eleTag && eleTag.length) {
                    WayBillNumber = eleTag[0].getElementsByTagName({ tagName: 'WayBillNumber'})[0].textContent;
                    log.debug('Waybillnumber:', WayBillNumber);
                 }
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'PostDate' });
                 var PostDate = eleTag && eleTag.length ? eleTag[0].textContent : '';
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'DueDate' });
                 var DueDate = eleTag && eleTag.length ? eleTag[0].textContent : '';
 // Edit made: Changed ({ tagName: 'TransactionDate' }); to ({ tagName: 'PostDate' });
 // var eleTag = bodyNode.getElementsByTagName({ tagName: 'TransactionDate' });
 // var TransactionDate = eleTag && eleTag.length ? eleTag[0].textContent : '';
 //Changed to:
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'PostDate' });
                 var TransactionDate = eleTag && eleTag.length ? eleTag[0].textContent : '';
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'Description' });
                 var Description = eleTag && eleTag.length ? eleTag[0].textContent : '';
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'Number' });
                 var InvNumber = eleTag && eleTag.length ? eleTag[0].textContent : '';
 
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'Ledger' });
                 var Ledger = eleTag && eleTag.length ? eleTag[0].textContent : '';

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'CostAPInvoiceNumber' });
                 var CostAPInvoiceNumber = eleTag && eleTag.length ? eleTag[0].textContent : '';

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'SellPostedTransactionNumber' });
                 var SellPostedTransactionNumber = eleTag && eleTag.length ? eleTag[0].textContent : '';

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'OperationsStaff'});
                 var OperationsStaff = '';
                 if (eleTag && eleTag.length) {
                    OperationsStaff = eleTag[0].getElementsByTagName({ tagName: 'Name'})[0].textContent;
                    log.debug('OperationsStaff:', OperationsStaff);
                 }

                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'SalesStaff'});
                 var SalesStaff = '';
                 if (eleTag && eleTag.length) {
                    SalesStaff = eleTag[0].getElementsByTagName({ tagName: 'Name'})[0].textContent;
                    log.debug('SalesStaff:', SalesStaff);
                 }


                 log.debug('Ledger', Ledger);
                 var Lines = [];
                 var eleTag = bodyNode.getElementsByTagName({ tagName: 'ChargeLineCollection' });
                 if (eleTag && eleTag.length) {

                     var eleTag = eleTag[0].getElementsByTagName({ tagName: 'ChargeLine' });

                     if (eleTag && eleTag.length) {

                         eleTag.forEach(function (ChangeLine) {
                             // log.debug('ChangeLine', ChangeLine);
                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'ChargeCode' });
                             var ChargeCode = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'ChargeCodeGroup' });
                             var ChargeCodeGroup = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'CostAPInvoiceNumber' });
                             var CostAPInvoiceNumber = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'CostDueDate' });
                             var CostDueDate = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'CostExchangeRate' });
                             var CostExchangeRate = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'CostInvoiceDate' });
                             var CostInvoiceDate = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'CostIsPosted' });
                             var CostIsPosted = _tag && _tag.length ? _tag[0].textContent : '';
                             
                             // return;
                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'CostOSAmount' });
                             var CostOSAmount = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'CostOSCurrency' });
                             var CostOSCurrency = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'Creditor' });
                             var Creditor = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Key' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'Debtor' });
                             var Debtor = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Key' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'Department' });
                             var Department = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'Description' });
                             var Description = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SellExchangeRate' });
                             var SellExchangeRate = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SellInvoiceType' });
                             var SellInvoiceType = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SellIsPosted' });
                             var SellIsPosted = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SellLocalAmount' });
                             var SellLocalAmount = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SellOSAmount' });
                             var SellOSAmount = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SellOSCurrency' });
                             var SellOSCurrency = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SellOSGSTVATAmount' });
                             var SellOSGSTVATAmount = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SellExchangeRate' });
                             var SellExchangeRate = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SellPostedTransactionNumber' });
                             var SellPostedTransactionNumber = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SellPostedTransactionType' });
                             var SellPostedTransactionType = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'CostLocalAmount' });
                             var CostLocalAmount = _tag && _tag.length ? _tag[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'OriginalTransactionNumber' });
                             var OriginalTransactionNumber = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'OriginalTransactionNumber' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'DataSource' });
                             var ConsolKey = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Key' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'JobCosting' });
                             var WayBillNumber = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'WayBillNumber' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'OperationsStaff' });
                             var OperationsStaff = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Name' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'SalesStaff' });
                             var SalesStaff = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Name' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'PortOfDestination' });
                             var PortOfDestinationCode = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'PortOfDestination' });
                             var PortOfDestinationName = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Name' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'PortOfOrigin' });
                             var PortOfOriginCode = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'PortOfPortOfOrigin' });
                             var PortOfOriginName = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Name' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'TransportMode' });
                             var TransportModeCode = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Code' })[0].textContent : '';

                             var _tag = ChangeLine.getElementsByTagName({ tagName: 'TransportMode' });
                             var TransportModeDescription = _tag && _tag.length ? _tag[0].getElementsByTagName({ tagName: 'Description' })[0].textContent : '';



                             var line = {
                                 ChargeCode: ChargeCode,
                                 ChargeCodeGroup: ChargeCodeGroup,
                                 CostAPInvoiceNumber: CostAPInvoiceNumber,
                                 CostDueDate: CostDueDate,
                                 CostExchangeRate: CostExchangeRate,
                                 CostInvoiceDate: CostInvoiceDate,
                                 CostIsPosted: CostIsPosted,
                                 CostLocalAmount: CostLocalAmount,
                                 CostOSAmount: CostOSAmount,
                                 CostOSCurrency: CostOSCurrency,
                                 Creditor: Creditor,
                                 Debtor: Debtor,
                                 Department: Department,
                                 ConsolKey: ConsolKey,
                                 Description: Description,
                                 SellExchangeRate: SellExchangeRate,
                                 SellInvoiceType: SellInvoiceType,
                                 SellIsPosted: SellIsPosted,
                                 SellLocalAmount: SellLocalAmount,
                                 SellOSAmount: SellOSAmount,
                                 SellOSCurrency: SellOSCurrency,
                                 SellOSGSTVATAmount: SellOSGSTVATAmount,
                                 SellExchangeRate: SellExchangeRate,
                                 SellPostedTransactionNumber: SellPostedTransactionNumber,
                                 SellPostedTransactionType: SellPostedTransactionType,
                                 OriginalTransactionNumber: OriginalTransactionNumber,
                                 WayBillNumber: WayBillNumber,
                                 OperationsStaff: OperationsStaff,
                                 SalesStaff: SalesStaff,
                                 PortOfDestinationCode: PortOfDestinationCode,
                                 PortOfDestinationName: PortOfDestinationName,
                                 PortOfOriginCode: PortOfOriginCode,
                                 PortOfOriginName: PortOfOriginName,
                                 TransportModeCode: TransportModeCode,
                                 TransportModeDescription: TransportModeDescription,
                             };

                             Lines.push(line);
                         });
                     }
                 }


                 var invoice_object = {
                     JobInvoiceNumber: JobInvoiceNumber,
                     InvNumber: InvNumber,
                     CostAPInvoiceNumber: CostAPInvoiceNumber,
                     JobKey: JobKey,
                     SellPostedTransactionNumber: SellPostedTransactionNumber,
                     LocalCurrency: LocalCurrency,
                     OrganizationCode: OrganizationCode,
                     TriggerDate: TriggerDate,
                     PostDate: PostDate,
                     DueDate: DueDate,
                     TransactionDate: TransactionDate,
                     Description: Description,
                     Ledger: Ledger,
                     ConsolKey: ConsolKey,
                     CompanyCode: CompanyCode,
                     EventBranch: EventBranch,
                     EventDepartment: EventDepartment,
                     EventType: EventType,
                     EventUser: EventUser,
                     EventReferenceObject: EventReferenceObject,
                     EventReference: EventReference,
                     OrganizationAddress: OrganizationAddress,
                     TransactionType: TransactionType,
                     TransactionKey: dataSourceKeyTag && dataSourceKeyTag.length ? dataSourceKeyTag[0].textContent : '',
                     Lines: Lines,
                     OriginalTransactionNumber: OriginalTransactionNumber,
                     WayBillNumber: WayBillNumber,
                     OperationsStaff: OperationsStaff,
                     SalesStaff: SalesStaff,
                     UBDebtor: UBDebtor,
                     PortOfDestinationCode: PortOfDestinationCode,
                     PortOfDestinationName: PortOfDestinationName,
                     PortOfOriginCode: PortOfOriginCode,
                     PortOfOriginName: PortOfOriginName,
                     TransportModeCode: TransportModeCode,
                     TransportModeDescription: TransportModeDescription,
                 };
                 log.debug('invoice_object', invoice_object);



             }
             var ret = {
                 DataSource: {
                     Type: dataSourceTypeTag && dataSourceTypeTag.length ? dataSourceTypeTag[0].textContent : '',
                     Key: dataSourceKeyTag && dataSourceKeyTag.length ? dataSourceKeyTag[0].textContent : '',
                 },
                 ActionPurpose: {
                     Code: actionPurposeCodeTag && actionPurposeCodeTag.length ? actionPurposeCodeTag[0].textContent : '',
                     Description: actionPurposeDescriptionTag && actionPurposeDescriptionTag.length ? actionPurposeDescriptionTag[0].textContent : '',
                 },
                 Company: {
                     Code: companyCodeTag && companyCodeTag.length ? companyCodeTag[0].textContent : '',
                     Country: companyCountryTag && companyCountryTag.length ? companyCountryTag[0].textContent : '',
                     Name: companyNameTag && companyNameTag.length ? companyNameTag[0].textContent : '',
                 }
             };

             if (invoice_object) ret.AccountingInvoice = invoice_object;

             return ret;
         }
         catch (e) {
             log.error('parseUniversalInterchangeXML err', e);
         }

         return null;
     }

     function parseUniversalResponseXml(xmlFileContent) {
         try {
             var xmlString = xmlFileContent.replace("http://www.cargowise.com/Schemas/Universal/2011/11", "");
             var xmlString = xmlString.replace("http://www.cargowise.com/Schemas/Universal/2011/11", "");
             var xmlString = xmlString.replace("http://www.cargowise.com/Schemas/Native/2011/11", "");


             var xmlDocument = xml.Parser.fromString({ text: xmlString });

             var bodyNode = xml.XPath.select({
                 node: xmlDocument,
                 xpath: '//Body'
             });

             if (!bodyNode || !bodyNode.length) throw new Error("No body");

             var CW_Obj_Keys = Object.keys(CW_OBJECT_TYPES);

             var objList = [];

             for (var i = 0; i < CW_Obj_Keys.length; i++) {
                 var cw_object_key = CW_Obj_Keys[i];
                 var cw_object_list = bodyNode[0].getElementsByTagName({ tagName: cw_object_key });

                 if (!cw_object_list || !cw_object_list.length) continue;


                 cw_object_list.forEach(function (cw_object) {
                     // log.debug('cw_object ' + cw_object_key, cw_object);
                     var object = { ObjectType: cw_object_key, Collections: {} };
                     for (var k = 0; k < CW_OBJECT_TYPES[cw_object_key].Fields.length; k++) {

                         var attrObj = cw_object.getElementsByTagName({ tagName: CW_OBJECT_TYPES[cw_object_key].Fields[k].Name });

                         if (attrObj && attrObj.length) {
                             object[CW_OBJECT_TYPES[cw_object_key].Fields[k].Name] = attrObj[0].textContent;
                         }
                     }

                     for (var k = 0; k < CW_OBJECT_TYPES[cw_object_key].Collections.length; k++) {
                         var collectionEleName = CW_OBJECT_TYPES[cw_object_key].Collections[k].Name;
                         var collectionName = collectionEleName + 'Collection';

                         var cw_collection = cw_object.getElementsByTagName({ tagName: collectionName });

                         if (!cw_collection || !cw_collection.length) continue;

                         var cw_collection_element = cw_collection[0].getElementsByTagName({ tagName: collectionEleName });

                         if (!cw_collection_element || !cw_collection_element.length) continue;

                         object.Collections[collectionName] = {
                             Name: collectionName,
                             ElementName: collectionEleName,
                             ElementList: []
                         };



                         for (kk = 0; kk < cw_collection_element.length; kk++) {
                             var element = {};
                             CW_OBJECT_TYPES[cw_object_key].Collections[k].Fields.forEach(function (field) {
                                 var attrObj = cw_collection_element[kk].getElementsByTagName({ tagName: field.Name });
                                 if (attrObj && attrObj.length) {
                                     var value = attrObj[0].textContent;
                                     if (field.Name == 'CountryCode') {
                                         value = attrObj[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                                     }
                                     element[field.Name] = value ? value : '';
                                 }
                             });
                             object.Collections[collectionName].ElementList.push(element);
                         }
                     }
                     objList.push(object);
                 });
             }
             return objList;
         }
         catch (e) {
             log.error('parseUniversalResponseXml', e);
         }
         return null;
     }

     function parseUniversalShipmentXml(xmlFileContent) {
         try {
             var xmlString = xmlFileContent.replace("http://www.cargowise.com/Schemas/Universal/2011/11", "");
             var xmlString = xmlString.replace("http://www.cargowise.com/Schemas/Universal/2011/11", "");

             var xmlDocument = xml.Parser.fromString({ text: xmlString });

             var bodyUniversalShipment = xml.XPath.select({
                 node: xmlDocument,
                 xpath: '//UniversalShipment '
             });

             if (!bodyUniversalShipment || !bodyUniversalShipment.length) throw new Error("No UniversalShipment");

             var bodyShipment = bodyUniversalShipment[0].getElementsByTagName({ tagName: 'Shipment' });

             if (!bodyShipment || !bodyShipment.length) throw new Error("No Shipment");

             var cw_object = CW_OBJECT_TYPES['ForwardingShipment'];

             var objList = [];

             var object = { ObjectType: 'ForwardingShipment', Collections: {} };

             for (var k = 0; k < cw_object.Fields.length; k++) {

                 var attrObj = bodyShipment[0].getElementsByTagName({ tagName: cw_object.Fields[k].Name });

                 if (attrObj && attrObj.length) {
                     var value = attrObj[0].textContent;
                     if (cw_object.Fields[k].Name == 'TotalWeightUnit') {
                         value = attrObj[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                     }

                     object[cw_object.Fields[k].Name] = value ? value : '';;

                 }
             }

             for (var k = 0; k < cw_object.Collections.length; k++) {

                 var collectionEleName = cw_object.Collections[k].Name;
                 var collectionName = collectionEleName + 'Collection';



                 var cw_collections = bodyShipment[0].getElementsByTagName({ tagName: collectionName });

                 if (!cw_collections || !cw_collections.length) continue;

                 object.Collections[collectionName] = {
                     Name: collectionName,
                     ElementName: collectionEleName,
                     ElementList: []
                 };

                 cw_collections.forEach(function (cw_collection) {

                     var cw_collection_element = cw_collection.getElementsByTagName({ tagName: collectionEleName });

                     if (!cw_collection_element || !cw_collection_element.length) return;

                     for (kk = 0; kk < cw_collection_element.length; kk++) {
                         var element = {};
                         cw_object.Collections[k].Fields.forEach(function (field) {

                             var attrObj = cw_collection_element[kk].getElementsByTagName({ tagName: field.Name });
                             if (attrObj && attrObj.length) {
                                 var value = attrObj[0].textContent;
                                 if (
                                     field.Name == 'CountryCode' ||
                                     field.Name == 'ChargeCodeGroup' ||
                                     field.Name == 'CostOSCurrency' ||
                                     field.Name == 'SellOSCurrency' ||
                                     field.Name == 'Department'
                                 ) {
                                     value = attrObj[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                                 }
                                 else if (field.Name == 'ChargeCode') {
                                     value = attrObj[0].getElementsByTagName({ tagName: 'Code' })[0].textContent;
                                     element['ChargeCodeDescription'] = attrObj[0].getElementsByTagName({ tagName: 'Description' })[0].textContent;
                                 }
                                 else if (
                                     field.Name == 'Creditor' ||
                                     field.Name == 'Debtor'
                                 ) {
                                     value = attrObj[0].getElementsByTagName({ tagName: 'Key' })[0].textContent;
                                 }


                                 element[field.Name] = value ? value : '';
                             }
                         });
                         object.Collections[collectionName].ElementList.push(element);
                     }
                 });
             }

             return object;
         }
         catch (e) {
             log.error('parseUniversalShipmentXml', e);
         }
         return null;
     }

     function validateRequest(xmlObj) {

         if (xmlObj._userName != CW_USERNAME) throw new Error('Invalid User');

         if (!xmlObj.messageList || !Array.isArray(xmlObj.messageList) || !xmlObj.messageList.length) throw new Error('No Message List');

     }

     function retrieveCWObjectByKey(type, key) {
         if (!type || !CW_OBJECT_TYPES[type]) throw new Error('Unknown CW Oject Type');

         if (!key) throw new Error('Empty CW Key Reference');


         var xml = '';

         if (type == 'ForwardingShipment') {
             xml += ('<UniversalShipmentRequest xmlns="http://www.cargowise.com/Schemas/Universal/2011/11" version="1.1">');
             xml += ('    <ShipmentRequest>');
             xml += ('        <DataContext>');
             xml += ('            <DataTargetCollection>');
             xml += ('                <DataTarget>');
             xml += ('                    <Type>ForwardingShipment</Type>');
             xml += ('                    <Key>' + key + '</Key>');
             // xml += ('                    <Key>S00001000</Key>');
             xml += ('                </DataTarget>');
             xml += ('            </DataTargetCollection>');
             xml += ('        </DataContext>');
             xml += ('    </ShipmentRequest>');
             xml += ('</UniversalShipmentRequest>');
         }
         else if (type == 'AccountingInvoice') {
             xml += ('<UniversalTransactionBatchRequest xmlns="http://www.cargowise.com/Schemas/Universal/2011/11" version="1.1">');
             xml += ('    <TransactionBatchRequest>');
             xml += ('        <DataContext>');
             xml += ('            <DataTargetCollection>');
             xml += ('                <DataTarget>');
             xml += ('                    <Type>AccountingInvoice</Type>');
             xml += ('                    <Key>00001005</Key>');
             xml += ('                </DataTarget>');
             xml += ('            </DataTargetCollection>');
             xml += ('        </DataContext>');
             xml += ('        <ActionType>');
             xml += ('            <Code>EXP</Code>');
             xml += ('        </ActionType>');
             xml += ('    </TransactionBatchRequest>');
             xml += ('</UniversalTransactionBatchRequest>');
         }
         else {
             xml += ('<Native xmlns="http://www.cargowise.com/Schemas/Native">');
             xml += ('<Body>');
             xml += ('   <' + type + '>');
             xml += ('       <CriteriaGroup Type="Key">');
             xml += ('           <Criteria Entity="' + CW_OBJECT_TYPES[type].EntityName + '" FieldName="Code">');
             xml += ('               ' + key + '');
             xml += ('           </Criteria>');
             xml += ('       </CriteriaGroup>');
             xml += ('   </' + type + '>');
             xml += ('</Body>');
             xml += ('</Native>');
         }
         // log.debug('xml', xml);
         var responseXml = request(xml, true);
         log.debug('responseXml', responseXml);

         if (responseXml) {
             var obj = null;
             if (type == 'ForwardingShipment') {
                 // saveTOXML('Temp/UniversalShipment.xml', responseXml);
                 obj = parseUniversalShipmentXml(responseXml);
             }
             else if(type == 'AccountingInvoice') {
                 saveTOXML('AccountingInvoice.xml', responseXml);
             }
             else {
                 obj = parseUniversalResponseXml(responseXml);
             }

             if (obj) {
                 return Array.isArray(obj) ? obj[0] : obj;
             }
         }
         return null;
     }

     function retrieveAllCWCustomers() {
         var xml = '';
         xml += ('<Native xmlns="http://www.cargowise.com/Schemas/Native">');
         xml += ('<Body>');
         xml += ('<Organization>');
         xml += ('<CriteriaGroup Type="Partial">');
         xml += ('<Criteria Entity="OrgHeader" FieldName="IsConsignee">');
         xml += ('True');
         xml += ('</Criteria>');
         xml += ('</CriteriaGroup>');
         xml += ('<CriteriaGroup Type="Partial">');
         xml += ('<Criteria Entity="OrgHeader.OrgCompanyData" FieldName ="IsDebtor">True</Criteria>');
         xml += ('</CriteriaGroup>');
         xml += ('</Organization>');
         xml += ('</Body>');
         xml += ('</Native>');
         log.debug('xml', xml);
         var responseXml = request(xml, true);
         log.debug('responseXml', responseXml);
     }

     function loadAllCWCustomers() {
         var xmlFile = file.load({ id: 'CargoWise/organizations_all.xml' });
         log.debug('xml', xmlFile.getContents());
         var res = parseUniversalResponseXml(xmlFile.getContents());

         return res;
     }

     return {
         request: request,
         parseXML: parseXML,
         parseUniversalInterchangeXML: parseUniversalInterchangeXML,
         parseUniversalResponseXml: parseUniversalResponseXml,
         retrieveCWObjectByKey: retrieveCWObjectByKey,
         API_CONF: API_CONF,
         CW_OBJECT_TYPES: CW_OBJECT_TYPES,
         retrieveAllCWCustomers: retrieveAllCWCustomers,
         loadAllCWCustomers: loadAllCWCustomers,
         validateRequest: validateRequest
     };

 });