# alpha-crm

An App for Customer Relationship Management to track client, contacts and communication history

## Project Description

Alpha-CRM is an Airtable and React build where the user is able to manage their customer relationships and track their communication history. From the homepage, the user is able to navigate to and click on an icon that leads to a corresponding page populated with client information including company details and contact persons. Each respective company will lead to a detailed profile and a form to create new contacts and communication history.

## Wireframes

The wireframes below depict the homepage and customer list for Alpha-CRM in web and phone format. The homepage contains a header displaying the app title and the client list. The individual client pages will have 3 components including contact lists and communication history lists. Both the contact list and communication history list will have create buttons which will lead to forms and submit buttons for creating new data.

![imageAlt](https://imgur.com/VGK4yxu.png)

![imageAlt](https://imgur.com/CYRKvPP.png)

![imageAlt](https://imgur.com/ONG2XuC.png)

![imageAlt](https://imgur.com/Eq2uSCt.png)

![imageAlt](https://imgur.com/gov8sX6.png)

## Component Hierarchy

![imageAlt](https://imgur.com/arC7rWU.png)

## API and Data Sample

Here is a data sample from the customers table. I will access this table via get requests on the home and form components.

```
{
    "id": "recgfBEQyuflWGFnP",
    "fields": {
        "client_logo": "https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png",
        "contacts": [
            "recpOqhbgZREnyOdU"
        ],
        "name_company": "Dell",
        "address": "123 Street",
        "zipcode": 12345,
        "customer_type": "USA",
        "account_manager": "John Doe",
        "state": "NY",
        "communication": [
            "rec9dJ0Z4V4nNbUsU"
        ]
    },
    "createdTime": "2021-07-13T10:34:55.000Z"
}

```

Here is a data sample from the contacts table. I will access this table via get requests on the CustomerDetails and form components.

```
{
    "records": [
        {
            "id": "recpOqhbgZREnyOdU",
            "fields": {
                "designation": "Purchase Manager",
                "email": "janedoe@email.com",
                "name_contact": "Jane Doe",
                "name_company": [
                    "recgfBEQyuflWGFnP"
                ],
                "phone": "123456789",
                "name_company (from clients)": [
                    "Dell"
                ]
            },
            "createdTime": "2021-07-13T10:44:03.000Z"
        }
    ],
    "offset": "recpOqhbgZREnyOdU"
}

```

Here is a data sample from the communications table. I will access this table via get requests on the CustomerDetails and form components.

```
{
    "records": [
        {
            "id": "rec9dJ0Z4V4nNbUsU",
            "fields": {
                "name_company": [
                    "recgfBEQyuflWGFnP"
                ],
                "notes": "Positive meeting. Will buy our software",
                "contact_method": "phone",
                "topic_discussed": "CRM purchase",
                "expected_revenue": 10000,
                "name_contacted": "Jane Doe",
                "name_company (from clients)": [
                    "Dell"
                ]
            },
            "createdTime": "2021-07-13T10:44:05.000Z"
        }
    ],
    "offset": "rec9dJ0Z4V4nNbUsU"
}

```

### MVP/PostMVP

#### MVP

- Set up an effective database on Airtable
  Home page with clickable icons and customer names that route to each respective CustomerDetails page.
- Get and post customer details from Airtable.
- Get and post contact details from Airtable.
- Get and post communication details from Airtable.
- Use forms to create customers, contact and communication and update Airtable.

#### PostMVP

- Delete posts from lists and CustomerDetails and airtable.
- Search Customer
- Create a Product Segment - Add, edit, delete products
- Dark Mode Theme

## Project Schedule

| Day     | Deliverable                                 | Status     |
| ------- | ------------------------------------------- | ---------- |
| July 13 | Proposal Approval / Airtable Setup          | Complete   |
| July 14 | Component Creation / Get, post, Delete Data | Incomplete |
| July 15 | Get, Post and Delete cont'd /Basic CSS      | Incomplete |
| July 16 | Grid, flexbox, responsive CSS / MVP         | Incomplete |
| July 17 | additional CSS / Post-MVP                   | Incomplete |
| July 20 | Presentations                               | Incomplete |

## Timeframes

| Component                             | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------------------------- | :------: | :------------: | :-----------: | :---------: |
| Proposal                              |    H     |      3hrs      |      hrs      |     hrs     |
| Proposal Revision                     |    H     |      3hrs      |      hrs      |     hrs     |
| Airtable setup                        |    H     |      2hrs      |      hrs      |     hrs     |
| Navbar & Footer Components            |    H     |      2hrs      |      hrs      |     hrs     |
| CustomerList Component                |    H     |      2hrs      |      hrs      |     hrs     |
| CustomerDetail Component              |    H     |      3hrs      |      hrs      |     hrs     |
| NewCustomer Component - Form          |    H     |      2hrs      |      hrs      |     hrs     |
| NewCustomer creation/update           |    H     |      2hrs      |      hrs      |     hrs     |
| EditCustomer - create/update          |    H     |      2hrs      |      hrs      |     hrs     |
| ContactList Component                 |    H     |      2hrs      |      hrs      |     hrs     |
| NewContact Component - Form           |    H     |      2hrs      |      hrs      |     hrs     |
| NewContact Component - create/update  |    H     |      2hrs      |      hrs      |     hrs     |
| EditContact Component - create/update |    H     |      3hrs      |      hrs      |     hrs     |
| CommunicationList Component           |    H     |      2hrs      |      hrs      |     hrs     |
| NewComm Component - Form              |    H     |      2hrs      |      hrs      |     hrs     |
| NewComm Component - create/update     |    H     |      2hrs      |      hrs      |     hrs     |
| EditComm Component - create/update    |    H     |      3hrs      |      hrs      |     hrs     |
| CustomerList CSS                      |    H     |      2hrs      |      hrs      |     hrs     |
| CustomerDetail CSS                    |    H     |      2hrs      |      hrs      |     hrs     |
| Navbar & Footer CSS                   |    H     |      2hrs      |      hrs      |     hrs     |
| Flexbox & CSS for MVP                 |    H     |      3hrs      |      hrs      |     hrs     |
| Advanced CSS                          |    H     |      3hrs      |      hrs      |     hrs     |
| Total                                 |    H     |     51hrs      |     00hrs     |    00hrs    |

## SWOT Analysis

### Strengths:

I have a good understanding of what I want my application to perform and how it will look. The labs and exercises we have completed will be beneficial in programming the multiple components and overcoming hurdles along the way.

### Weaknesses:

The complexity of CRUD and that it is relatively new knowledge for me is expected to cause some hurdles along the way as I create the app and ensure its various functionalities. I will need to focus on creating and ensuring the basic functionalities of my components for a working MVP. I will be ensuring that I reference and research additional materials in order to ensure a smooth execution.

### Opportunities:

React is vast and allows developers to create a vast number of solutions so I'm hoping for this project to allow me to practice, refine and showcase the knowledge and skills that I've gained over the past 2 weeks. I wanted to challenge myself to create a basic Customer Relationship Management software - a software that is commonly used by many organizations around the world.

### Threats:

I am worried that I may lose too much time when trying to overcome debugging issues or figuring out how to execute certain functions. Although this is a common challenge for developers, I would like to be able to finish my project on time and be able to add on my post-MVP goals that I set for this project. If a delay caused by errors becomes too grave of an issue I will have to make sure that I get the right assistance either from my classmate, TAs or instructors.
