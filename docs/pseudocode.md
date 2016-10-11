# Duck Hunt

## Game loop

**Assuming two player game**

- Round = 1
  - While players remaining
  - Player = 1
  - For each active player
    - Target = 1
    - While target <= 10
      - Duck flies around screen
        - If at edge of screen, change direction
      - When time limit expires or ammo used up
        - Ducks exit
        - Fail target
        - Move to next target
    - At end of round
      - If successful targets < required
        - Fail current player
      - Else if all targets hit
        - Award bonus points to current player
      - Player = Next available player
  - Round += 1

## On shoot

- Check if target has been hit
- If true
  - Drop target in UI
  - Increase player's score
  - Mark current target has hit
  - Move to next target
- Else
  - Deduct ammo
  - If out of ammo
    - Mark current target has miss
    - If targets remaining
      - Move to next target
    - Else
      - See 'at end of round' in game loop
