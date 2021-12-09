# TRP-CDM-DATA-MIGRATION
## Introduction
Data Migration Tool used to migrate the data from TRP 5.0 to CDM Data Model.

This tool only consider the TRP standard objects for other non-standard objects are not in scope.

Also, in case any of the logic is not fulfilled with your business requirement, please feel free to clone from repo and make required adjustment.

Supported objects are as following:
- ### TRP Master Data
  - Resource Category
  - Location Filter
  - Resource Group
  - Region Group
  - Resource Group
  - Resource Filter
  - Lease Contracts
  - Stock Setting
  - Multi-Attribute Filter
- ### TRP Required Transportation Management System Data 
  - Location Master Data
    - Location
    - Region
    - Region Hierarchy
  - Resource Master Data
    - Resource
    - Resource Status
    - Reousrce Change History
    - Planned Downtime
    - Eqiupment Types
  - Transaction Data
    - Transportation Unit
    - Transportation Request
    - Freight Order

## How to use
1. Ensure TRP core is upgraded to version 5.0.
2. Clone / Download this repo to your local.
3. Install [***NodeJS***](https://nodejs.org/) in your local.
4. Install the mbt tool for packaging.
    ```
    npm install mbt -g
    ```
5. Install all of the dependent packages in **project root**.
   ```
   npm install
   ```
6. Run following command in the **project root** to generated the *mtar* file.
   ```
   npm run build-MTA
   ```
7. Create the ***mtaext*** by copy ***EXAMPLE.mtaext***, and update the dependent services accordingly.
8. Deploy this to target XSA server, by provide the newly created ***mtaext*** file.
   ```
   xs deploy .\mta_archives\SAP_TRP_CDM_DATA_MIGRATION_REL_1.0.0.mtar -e \EXAMPLE.mtaext
   ```
9. Once it's deployed successful, run below command to get the service url.
   ```
   xs app trp-cdm-migration-srv
   ``` 
10.  Setup the job in **XSA Job Schedule Service Dashboard** to update the relevant data regularly. And the job parameters are as following:
    - **Name:**  
      Name of the job. 
    - **Description:**  
      Provide the description accordingly. 
    - **Action:**  
      service url which got from ***step 8***, and add the below accordingly.
      - /scheduleMDMJob  
        For TRP created Master Data.
      - /LocationsCDMJob
        For TRP required Transportation Master Data.   
      - /OrdersCDMJob  
        For TRP required Transaction Data.
      - /CommonsCDMJob
        For other common data from Transportation Management System.     
      - **HTTP Method:**  
        GET 
      - **Target Application:**  
        trp-cdm-mingration-srv  
      - **Start Time (UTC):**  
        [***Optional***]The start time of the job.
      - **End Time (UTC):**    
        [***Optional***]The end time of the job. 
11. Create the Schedules corresponding to each job. Parameter could be as following:
    - **Description:**  
      Provide the description accordingly.  
    - **Pattern:**  
      Recurring - Repeat Interval. 
    - **Value:**  
      The interval of the job will be executed.   
      e.g. 30 minutes 
    - **Start Time (UTC):**  
      [***Optional***]The start time of the job.
    - **End Time (UTC):**    
      [***Optional***]The end time of the job. 