# Project Overview
A Test to Rank Your Core Values. 

The intention of this project is to help people discover their top core values in a more user-friendly way.

## Background
The subject of core values was presented to me within a live, online [Mindful Self-Compassion Course](https://centerformsc.org/). The 90-item list of core values used in this project was shared within that course.  

## Implementation - Overview
This test is comprised of 6 total rounds. Each round, the core values are put into sets of five., and the user is presented with the task of ranking the core values of each set. 
- For each set, the user only ranks the top three of the five core values. First place gets a weighted score of +2, second place gets a weighted score of +1, Third place gets a weighted score of 0, and the remaining two core values get a weighted score of -1.
- Throughtout the process of the rounds, the core values accumulate a weighted score. After the end of rounds 3, 4, 5, and 6: a number of the lowest ranking core values are removed.

**Sets/Items Per Round**
- Round 1: 90 items (18 sets). No core values removed at end of round.
- Round 2: 90 items (18 sets). No core values removed at end of round.
- Round 3: 90 items (18 sets). 35 lowest core values removed (38.8%) at end of round.
- Round 4: 55 items (11 sets). 20 lowest core values removed (36.3%) at end of round.
- Round 5: 35 items (7 sets). 15 lowest core values removed (42.8%) at end of round.
- Round 6: 20 items (4 sets). 10 lowest core values removed (50%) at end of round.
- Remaining Core Values Not Removed at the End of the Test: **10**.

## Implementation - Further Details.
During the processs of creating sets of core values for each round, attempts are made to make the sets completely unique between rounds. In other words, attempts are made to try and have every core value within every set to have not yet seen any other core value within each round's set.

The core values are shuffled when creating sets in order to prevent bias. 

The spirit of this test was to make it fa. If the user would like additional validity in the results, the user is invited to take the test multiple times.  T

## Attributions 
Thanks to the instructor of my live, online mindful self compassion course: [Joel Grow, PhD](https://www.joelgrow.com/) for his encouragement when I shared the idea of building this tool. 

Thanks to Eric Carr for sharing his knowledge on ranking strategies. This helped me pick the strategy that is used in this tool. 



