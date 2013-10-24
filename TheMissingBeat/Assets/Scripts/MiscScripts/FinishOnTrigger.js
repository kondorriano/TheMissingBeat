#pragma strict

//Script que termina la partida al llegar al final

private var cam : GameObject;
private var fin : boolean = false;

function Start() {
	cam = GameObject.FindGameObjectWithTag("MainCamera");

}

function OnTriggerEnter(c : Collider) {
	if(!fin) {
		if(c.gameObject.tag == "Player") {
			cam.SendMessage("Finish");
			fin = true;
		}
	}
}