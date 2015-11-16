# kh1550-final-project (Virtual Cat)
CSCI-UA.480-001: Applied Internet Tech

# Project Description

For the more unforunate of us who cannot have a cat, Virtual Cat is here to fill that blasphemous void (Disclaimer: does not actually substitute for the glory that is having a real cat). Users will start with a standard cat and must earn its affection through treats, rubs, and gifts. However, these luxuries cost money! Users will have to use work actions to earn money to please their furry friend. Users may also bring their cats to their own Cat Cafe where they can send invite links to other Virtual Cat players and chat with their cats.

# Requirements
* Express
* Express Handlebars
* Express Generator
* Express Session
* Socket.io
 
# Wireframes
![wireframe](/documentation/wireframe.png)

# Site Map
![sitemap](/documentation/sitemap.png)

# Use Case Diagram
pretends I know how to do this

# Research
* Real-time chatting
..* I would like to add some social interactions so the game doesn't feel too pointless. I will need a way to make an unique url for each player's cat cafe, and restrict vistors to one other player. I'll need to research how to implement a chatbox and share their cats. The module I plan to use for real-time sharing is Socket.io. For the unique URL, I may write up my own function.

* Event history
..* I'm still contemplating this but I think I would like to add a chatbox-like event history that supplies random messages, such as telling the user their cat is "hungry" to motivate players to "feed" their cats, or that their cats love them to offer some sort of gratification. I do not think I will need modules for this.

# Backup Idea

[Friend Match History] Using the Riot Games API, users can find their League of Legends match history with another player for a specified period and a max of 20 games at a time. There will be a specific option to attempt to find the first game played between these two users for a given time period estimate. I would like to implement this regardless of which idea I got with, as I really want to know my first match with my friends myself!
