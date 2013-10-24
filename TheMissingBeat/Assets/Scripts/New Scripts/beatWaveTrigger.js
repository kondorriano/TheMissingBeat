#pragma strict




function OnTriggerEnter(c : Collider) {
	c.SendMessage("changeBeat", true);
}

function OnTriggerExit(c : Collider) {
	c.SendMessage("changeBeat", false);
}