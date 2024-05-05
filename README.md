How do I specify I need information.  For example choose 2 players.  
Choose one player.  
Default is the null value maybe?

Who

	Just the player.  
	One other player
	Multiple other players
	All players.  

When
	
    Last round
	Previous rounds
	All rounds
	Certain number of rounds

Target
	
    No target (add to field)
	Single card target (like sitting on top of, teleporting)
	Rule (turrets hit highest from previous round)
	Certain cards (specific card or cards) store as cardids?
	Next to (this would be resolved on the server I think? Use the state?)

Number effect
	
    Plus int
	Multiply int
	
Cost field
	
    Num from hand
	Num from field
	Num to discard (means either)
	Min val 
    min val multiplicative

Special
	
    Show cards
	Play cards
	Draw cards
    return to hand
    deactivate cards

	
Unaffected By
	
    Ids of cards that don't apply to this card 

	
Okay I think we need a card action on the database side.  That way a card can have multiple actions.  
	

Voc hazard card can be multiple (all) other players and for your self it is a negative 1
your 6 boys use the unaffected by field.  

not sure about sang_gen
