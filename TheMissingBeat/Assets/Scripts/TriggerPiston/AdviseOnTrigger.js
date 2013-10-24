#pragma strict
//Script utilizado para activar los ultimos pistones del nivel Demo, cuando el jugador los toca los pistones bajan

function OnTriggerEnter(c : Collider) {
	if(c.gameObject.tag == "Player") {
		transform.parent.SendMessage("Activate",true);
	}
}