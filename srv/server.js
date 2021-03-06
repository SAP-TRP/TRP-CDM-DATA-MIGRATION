/*eslint no-console: 0*/
"use strict";

const express = require('express');
const xsenv = require('@sap/xsenv');
const hdbext = require('@sap/hdbext');

const app = new express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Load environment variables
xsenv.loadEnv();

/**
 * 
 * @param {*} hanaConfig 
 * @param {*} tag 
 */
function getHanaClient(hanaConfig, tag) {
    return new Promise((resolve, reject) => {
        let hanaCredentials;
        if (hanaConfig && hanaConfig.hana) {
            hanaCredentials = hanaConfig.hana;
        } else {
            hanaCredentials = xsenv.cfServiceCredentials({
                tag: tag
            });
        }

        hdbext.createConnection(hanaCredentials, (err, client) => {
            if (err) {
                reject(err);
            }
            resolve(client);
        });
    });
}

// API to migrate data to CDM
app.get('/scheduleCDMJob', async function(req,res){
    let hanaOptions = xsenv.getServices({
        hana: {
            tag: "trp-cdm-migration-db"
        }
    });
    const conn = await getHanaClient(hanaOptions.hana, "trp-cdm-migration-db");
    console.log("Connection Established");
    var finished="",unfinished="";
    // Locations
    const procName_locations = "SAP_TRP_DB_P_EXT_CDM_MIGRATION_LOCATIONS";
    let sqlQuery_locations = 'call "'+procName_locations+'"()';
    try{	
        await conn.exec(sqlQuery_locations);
        finished += "Locations ";
        console.log("Location data reload job finished");
    }catch(e){
        unfinished += "Locations ";
        console.log(`Location data reload job failed with error: ${e.message}`);
    }

    // Commons
    const procName_commons = "SAP_TRP_DB_P_EXT_CDM_MIGRATION_COMMONS";
    let sqlQuery_commons = 'call "'+procName_commons+'"()';
    try{	
        await conn.exec(sqlQuery_commons);
        finished += "Commons";
        console.log("Commons data reload job finished");
    }catch(e){
        unfinished += "Commons";
        console.log(`Commons data reload job failed with error: ${e.message}`);
    }

    // Orders
    const procName_orders = "SAP_TRP_DB_P_EXT_CDM_MIGRATION_ORDERS";
    let sqlQuery_orders = 'call "'+procName_orders+'"()';
    try{	
        await conn.exec(sqlQuery_orders);
        finished += "Orders ";
        console.log("Orders data reload job finished");
    }catch(e){
        unfinished += "Orders ";
        console.log(`Orders data reload job failed with error: ${e.message}`);
    }

    // Resources
    const procName_resources = "SAP_TRP_DB_P_EXT_CDM_MIGRATION_RESOURCES";
    let sqlQuery_resources = 'call "'+procName_resources+'"()';
    try{	
        await conn.exec(sqlQuery_resources);
        finished += "Resources ";
        console.log("Resources data reload job finished");
    }catch(e){
        unfinished += "Resources ";
        console.log(`Resources data reload job failed with error: ${e.message}`);
    }

    
    res.send("Finshed jobs " + finished + "\nUnfinished jobs " + unfinished);
});

// API to migrate mdm data to cdm rv
app.get('/scheduleMDMJob', async function(req,res){
    let hanaOptions = xsenv.getServices({
        hana: {
            tag: "trp-cdm-migration-db"
        }
    });
    const conn = await getHanaClient(hanaOptions.hana, "trp-cdm-migration-db");
    console.log("Connection Established");
    var finished="",unfinished="";

    // TRP Master Data
    const procName_locations = "P_MDM_DATA_MIGRATION";
    let sqlQuery_locations = 'call "'+procName_locations+'"()';
    try{	
        await conn.exec(sqlQuery_locations);
        finished += "MDM ";
        console.log("MDM data reload job finished");
    }catch(e){
        unfinished += "MDM ";
        console.log(`MDM data reload job failed with error: ${e.message}`);
    }
    res.send("Finshed jobs " + finished + "\nUnfinished jobs " + unfinished);
});

app.get('/OrdersCDMJob', async function(req,res){
    let hanaOptions = xsenv.getServices({
        hana: {
            tag: "trp-cdm-migration-db"
        }
    });
    const conn = await getHanaClient(hanaOptions.hana, "trp-cdm-migration-db");
    console.log("Connection Established");
    var finished="",unfinished="";

    // Orders
    const procName_orders = "SAP_TRP_DB_P_EXT_CDM_MIGRATION_ORDERS";
    let sqlQuery_orders = 'call "'+procName_orders+'"()';
    try{	
        await conn.exec(sqlQuery_orders);
        finished += "Orders ";
        console.log("Orders data reload job finished");
    }catch(e){
        unfinished += "Orders ";
        console.log(`Orders data reload job failed with error: ${e.message}`);
    }
    
    res.send("Finshed jobs " + finished + "\nUnfinished jobs " + unfinished);
});

app.get('/LocationsCDMJob', async function(req,res){
    let hanaOptions = xsenv.getServices({
        hana: {
            tag: "trp-cdm-migration-db"
        }
    });
    const conn = await getHanaClient(hanaOptions.hana, "trp-cdm-migration-db");
    console.log("Connection Established");
    var finished="",unfinished="";

    // Locations
    const procName_locations = "SAP_TRP_DB_P_EXT_CDM_MIGRATION_LOCATIONS";
    let sqlQuery_locations = 'call "'+procName_locations+'"()';
    try{	
        await conn.exec(sqlQuery_locations);
        finished += "Locations ";
        console.log("Location data reload job finished");
    }catch(e){
        unfinished += "Locations ";
        console.log(`Location data reload job failed with error: ${e.message}`);
    }
    
    res.send("Finshed jobs " + finished + "\nUnfinished jobs " + unfinished);
});

app.get('/CommonsCDMJob', async function(req,res){
    let hanaOptions = xsenv.getServices({
        hana: {
            tag: "trp-cdm-migration-db"
        }
    });
    const conn = await getHanaClient(hanaOptions.hana, "trp-cdm-migration-db");
    console.log("Connection Established");
    var finished="",unfinished="";

    // Commons
    const procName_commons = "SAP_TRP_DB_P_EXT_CDM_MIGRATION_COMMONS";
    let sqlQuery_commons = 'call "'+procName_commons+'"()';
    try{	
        await conn.exec(sqlQuery_commons);
        finished += "Commons";
        console.log("Commons data reload job finished");
    }catch(e){
        unfinished += "Commons";
        console.log(`Commons data reload job failed with error: ${e.message}`);
    }
    
    res.send("Finshed jobs " + finished + "\nUnfinished jobs " + unfinished);
});

app.get('/ResourcesCDMJob', async function(req,res){
    let hanaOptions = xsenv.getServices({
        hana: {
            tag: "trp-cdm-migration-db"
        }
    });
    const conn = await getHanaClient(hanaOptions.hana, "trp-cdm-migration-db");
    console.log("Connection Established");
    var finished="",unfinished="";

    // Resources
    const procName_resources = "SAP_TRP_DB_P_EXT_CDM_MIGRATION_RESOURCES";
    let sqlQuery_resources = 'call "'+procName_resources+'"()';
    try{	
        await conn.exec(sqlQuery_resources);
        finished += "Resources ";
        console.log("Resources data reload job finished");
    }catch(e){
        unfinished += "Resources ";
        console.log(`Resources data reload job failed with error: ${e.message}`);
    }
    
    res.send("Finshed jobs " + finished + "\nUnfinished jobs " + unfinished);
});

// Start the server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

process.on("uncaughtException", function (exception) {
    console.log(exception);
});
