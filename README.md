# Random Walk Simulator

Hello my name is John Delucia, I am a senior at Wake Forest University studying Engineering, Mathematics and Computer Science. 
This program is a random walk generator which includes a variety of simulation types explained below. 

**Single Face:** Simulations are completed on an 8 by 8 grid.

**Heading P(0.5):** The user will select a starting position for the search node and a position for the target node. 
  For each move, the search node wil have a 50% probably of moving toward the target node

https://user-images.githubusercontent.com/96018567/152036231-16a9bd78-c9cd-493b-877e-d9719df7c67e.mov

**Obstactles:** The user will select a starting position for the search node, obstacles that will obstruct its path, and a position for the target node. 
  If the user completly encloses the search node with obstacles, if will never reach the target and will run indefinitely. 

https://user-images.githubusercontent.com/96018567/152036258-c296391a-7d8d-406b-ad00-ab61ac86c84c.mov
  
**No BackTracking:** The user will select a starting position for the search node and a a position for the target node. 
  The search node will not be able to be allowed to revisit any nodes it has touched. The search node will either find the target or collide with itself.

https://user-images.githubusercontent.com/96018567/152036321-81bae9d9-d8f3-4448-a7cb-f3a254d08fa3.mov

**Grid Filling:** The user will select a starting position for the search node and place obstacles in the grid. 
  If the search node is not completely surrounded by obstacles, the program will finish once the entire grid is filled. 

https://user-images.githubusercontent.com/96018567/152036424-886d88bd-800e-4256-ad43-39ed543c2e4b.mov

**Cubic Exterior:** Simulations are completed on the 6 exterior faces of a cube.

**Target Finding:** The user will select a starting position for the search node and a position for the target node. 
  The program will return the path taken to reach the target.

https://user-images.githubusercontent.com/96018567/152036480-3879969f-0181-4d30-ba12-380e6c27c2f6.mov

**Grid Filling:** The user will select a starting position for the search node and the program will return the number of moves required to fill the grid.
  
https://user-images.githubusercontent.com/96018567/152036512-813fc62f-1148-4fc0-a0f7-d474d23e2776.mov

**Cops and Robbers:** Simulation is completed on an 8 by 8 grid.
  This is the most complex simulation of this program as it involves multiple search nodes (cops) and target nodes (robbers).
  This program will be completed by February 30 2022.
