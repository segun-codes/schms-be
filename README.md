# schms-be
This is a school management. 
It incorporates facility and features to simplify and automate business management process in elementary and secondary schools.
Note, this readMe file will be cleaned-up into proper format down the line. For now, it's serving the purpose of scribblesheet for the use of the developer

# To do
1. Write test for all endpoints and util functions
2. Implement constraints to achieve the underlisted "sequence of setup" 

# SCRIBBLESHEET SECTION - THE FOLLOWING ARE DESIGN THOUGHTS AND CONSIDERATION

# EXPECTED FEATURES
## Basic module
### Basic
1. classroom/laboratory use scheduling
2. Subject and curriculum management
3. Student enrolment management
4. Student profile management
5. Teachers, minders and support staff profile management
6. Student performance management
7. Teacher performance management

### Premium
1. Online exam rendering and automatic marking 
2.

### 

# Sequence of setup
Adhere to the sequence below to rig-up the school management system
1. Create school - you must setup seed number (in format 0, 00, 000 or 0000 only) for last_student_no, last_employee_no, last_parent_no, . Next numbers will be generated from there
2. Create session
3. Create term
4. ...
5. ..



# Acronyms Explained
NLS202320001
NLA  - 3-letter acronym for the school (e.g., NLS - Nafowa Little Angels School)
2023 - Calendar year student was admitted to the school
2    - Term student was admitted into the school. 1 -> 1st term, 2 -> 2nd term, 3 -> 3rd term 
0001 - School-issued serial number of student

# Design Decisions
1. autoincrement field "id" is used on all schemas to provide the flexibility of querying

# Adding a new set of APIs
You will need to update/create the following files:
1. schema
2. controller (in folder model)
3. router (in folder routes)
4. update dbOperations 
5. update the schemaSetup source file

# ID Generation Format
## Anatomy of Student ID
"studentId": "NLS20231001", 
SSYYYYLTNNNN - 
SSS     - two letters from school name
YYYY   -  year of admission
T      -  term 
NNNN   - a serial number; this number restarts from one after end of each year; this means a maximum of 9999students can be onboarded per term 

## Anatomy of Parent ID
"parentId": 

## Anatomy of Student ID


## Anatomy of API Key (tentative)
XXXXXXXXXYYYYYYZZZMMM
XXXXXXXXX - 9-alphanumeric characters, randomly generated
YYYYYY - 
ZZZ - 3-letters, it must represent the  


# Subfolder "Admin"
Contains services that are shareable among many schools subscribed to the platform


# Using Dev or Test DB
In file dbOperations-one.js uncomment the appropriate

