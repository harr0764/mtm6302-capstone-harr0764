# mtm6302-capstone-harr0764

## Capstone Project - Part 4 Report

### Steps Taken

*Project Structure:*
- Set up an organized file structure with three files: **index.html**, **style.css**, and **script.js**
- Combined all previous HTML files into the index.html to change it into a SPA.
- Managed the state of the app through JavaScript by dynamically showing and hiding sections without refreshing the page.

*JavaScript Functionality:*
- Used JavaScript for loading dynamic content, including the Pokémon's image, classification, abilities, etc., from the **PokéAPI**.

### Resources

- **PokeAPI**: The main data source for all Pokémon-related information, including types, abilities, and stats.
  - URL: [https://pokeapi.co/](https://pokeapi.co/)
- **Icons8**: Icons used throughout the project, including in the caught section.
  - URL: [https://icons8.com/](https://icons8.com/)
- **Google Fonts**: Fonts like **'Press Start 2P'** were used for the Pokédex theme.
  - URL: [https://fonts.google.com/](https://fonts.google.com/)

### Challenges Faced

- **Dynamic Content Loading**: The biggest challenge was ensuring the **details section** displayed correctly when a Pokémon card was clicked. Although the app was designed as a SPA, I struggled with the browser attempting to load a non-existent **details.html** page. This issue stemmed from browser behavior, and despite hours of troubleshooting, I was unable to resolve it.
- **Active Navigation Link**: Another issue I encountered was dynamically changing the navigation link's colour (to blue) to indicate the active page. Despite trying various JavaScript approaches and CSS solutions, I was unable to get the link to turn blue when the page content changed. This was a minor frustration in terms of user experience that I couldn't figure out by the end of the project.