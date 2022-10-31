# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Facilities > Agents > Shifts

1. Update the Agents Schema. Create new column for custom ids within the Agent table. Make this a primary key so it can be used in other tables. Likely make the custom id be a string rather than an integer to allow more customization.

- This should be relatively simple, however, there are a few factors that could slow down the implementation of this step
- The sheer number of Agents that would need new custom ids.
- The method for determining custom ids. Unless the Facility has a system for generating their own custom ids, it won't work right away compared to the previous system which presumably used the auto-incrementing database ids. These are available upon creation. We could implement a unique id generator system ourselves but this could take away from the Facility's ability to generate their own ids. Because Agents would be initially created without a custom id, this could lead to some issues if the Facility tried to generate a report with new employees who haven't been given a custom id yet.

2. Update the foreign keys in both the Facilities and Shifts tables that previously referenced the database ids of Agents. Replace this with the newly created custom ids.

- This way, we no longer have to rely on the internal database id for obtaining information about any Agent. Rather, we can get any information we want about the Agent with the custom ids.

3. Update any JOIN statements that previously connected the Facility and Shift tables to the Agent table by internal id. The joins should target Agents based on the new custom id column.

- This will help ensure any previous functions, statements, etc will still execute and retrieve the proper information.

4. Depending on how the `getShiftsByFacility` function is written, we may have to rewrite this function to properly retrieve all the Agent metadata.

- If it is retrieving this information from its internal database id then we need to update the function to retrieve its data based on the new custom ids we created.

- This is important because we need to be able to properly distinguish which agent worked which shifts at the particular facility.

- If this is done correctly, then the `generateReport` function shouldn't need to be updated. Its sole purpose is to take the information we retrieved from the `getShiftsByFacility` function and convert it into a PDF.
