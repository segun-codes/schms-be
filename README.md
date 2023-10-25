# schms-be
This is a school management. 
It incorporate facility and features to simplify and automate business management process in elementary and secondary schools.

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

## 


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