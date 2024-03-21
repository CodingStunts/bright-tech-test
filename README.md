## Thanks for looking through my tech test.

I've worked through this over a couple of hours and wanted to complete it (at least functionally, I'm not saying it's pretty) before handing it in so I went over the time limit.

I decided to stick with pure functionality and not do any real styling on it. I had this vision of simply recreating a standard iOS Finder pane, so kept it basic with file and folder icons and and kept it black and white for the text. 

I changed up the original example json object to include file sizes and also to nest further folders inside the existing folders to make the implementation a little more challenging and fun to work on.

I used CRA since the application was meant to be simple and didn't go overboard with using extra packages and such. I stuck with the basic React and JavaScript tools to create this. I considered using a router and presenting individual pages for each folder opened but based on the description and the time scales you suggested for this to be made I decided a simple case of presenting the internal files and folders outside of the clicked folder in the style of a drop down would cover the bases.

I terms of the utilities in the application I created the sort and filter within the upper nesting layer of the folder structure. Given more time I would have liked to have moved these into their own utils file to be able to access them within particular folders to further sort and filter those files too. As for now they only work on that outer level.

I also implemented a clear button to return the files in their entirety when your filter was completed.

Given a little more time I would have liked to have refined these functions a little more to make them cleaner and more user friendly.

I've tested that all expected components are rendered on the screen in the numbers we would expect to see. I also tested that the functionality of the button pressed and UI element interactions had the desired effect on the order and number of rendered files. Had I had more time to do so I would have also liked to have made some tests to run some dummy data through the util functions directly and unit test them, rather than just their effects on the UI.

I tried to get the final (commented out) test to pass before I went to submit this but I couldn't for the life of me work out what was stopping it running as expected. I assume it's something to do with the rerender not happening before the next expect block fires but I can't be sure. Given more time I'd have loved to have ironed that one out!

## Running the app

Since this app was created with CRA, the standard npm run start and npm run test will do everything you need from it. 