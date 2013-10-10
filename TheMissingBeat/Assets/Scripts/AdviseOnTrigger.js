#pragma strict

function OnTriggerEnter(c : Collider) {
	if(c.gameObject.tag == "Player") {
		transform.parent.SendMessage("Activate",true);
	}
}