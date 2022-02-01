# randomWalk

Hello my name is John Delucia, I am a senior at Wake Forest University studying Engineering, Mathematics and Computer Science. 
This program is a random walk generator which includes a variety of simulation types explained below. 

**Single Face:** Simulations are completed on an 8 by 8 grid.

**Heading P(0.5):** The user will select a starting position for the search node and a position for the target node. 
  For each move, the search node wil have a 50% probably of moving toward the target node.
  
  ![Heading](https://user-images.githubusercontent.com/96018567/152034101-e10944dd-296e-47b5-a886-93bfcc21c4b8.gif)
 
  
**Obstactles:** The user will select a starting position for the search node, obstacles that will obstruct its path, and a position for the target node. 
  If the user completly encloses the search node with obstacles, if will never reach the target and will run indefinitely. 
  
**No BackTracking:** The user will select a starting position for the search node and a a position for the target node. 
  The search node will not be able to be allowed to revisit any nodes it has touched. The search node will either find the target or collide with itself.
  
**Grid Filling:** The user will select a starting position for the search node and place obstacles in the grid. 
  If the search node is not completely surrounded by obstacles, the program will finish once the entire grid is filled. 

**Cubic Exterior:** Simulations are completed on the 6 exterior faces of a cube.

**Target Finding:** The user will select a starting position for the search node and a position for the target node. 
  The program will return the path taken to reach the target.

**Grid Filling:** The user will select a starting position for the search node and the program will return the number of moves required to fill the grid.
  
**Cops and Robbers:** Simulation is completed on an 8 by 8 grid.
  This is the most complex simulation of this program as it involves multiple search nodes (cops) and target nodes (robbers).
  This program will be completed by January 30 2022.
