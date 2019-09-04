Revised data structure.

**** ACTOR ****

Removed previous values from modal.

New modal (dialog) designed for actor 
- dynamically saved actor name agent1
- dynamically saced main goal [actor]_mainGoal
- new actor drop down box created for soft dialog
- dynamically populated actor name in dropdown (.agent-select)

agentCount - Increments whenever the user creates a new agent
newAgentName = user given agent name is saved
agent[agentCount]_mainGoal - main goal specified by the user for agent [agentName]

**** SOFT GOAL ****
Soft goals are saved based on levels
Contribution code changed based on the number of connection available

New Modal designed for soft Goal
- Level dropdown box is added.
- Contribution dropdown box is added.
- Change event is added for modal
- Based on level change the contribution values are dynamically changed 
- Contribution dropdown is filled based on the level of softgoal
- Weight dropdown is added when last level is selected 

levelOneCounter, levelTwoCounter, levelTwoCounter - Increments based the softGoals added
agent[agentCount]_lvl+[softLevel]+_soft+[level*Counter] - soft goals are stored in this varianle type

**** OPERATION ****
New opertion dialog box created

New Modal designed for operation goal
- Softgoals are dynamically populated 

agent[agentCount]_operation[opertionCOunt] - Opertaion name is stored in this


**** CONNECTION ****
Used CSS properties for easy adding of values.

connection[] - connection specifed are added here
connectionValue[] - respective values are added here.




FURTHER WORK:
levelCounter - based on actor
connection - for softgoals






