#pragma strict

//Script que guarda el ultimo savepoint, y si alguna cosa mata al engranaje se ocupa de moverlo a su lugar.

private var savePoint : Vector3;

function Start() {
	savePoint = transform.position;
}

function Update() {
	if(Input.GetKeyDown(KeyCode.F5) || RestartJoystick()) Application.LoadLevel(Application.loadedLevel);
	if(Input.GetKeyDown(KeyCode.Escape) || EscapeJoystick()) {
		PlayerPrefs.Save();
		Application.Quit();
	}
}

function OnTriggerEnter(c : Collider) {
	if(c.gameObject.tag == "SavePoint") {
		savePoint = c.transform.position;
		savePoint.y += 0.5;
	}
}

function Die() {
	transform.position = savePoint;
	rigidbody2D.velocity = Vector2(0,0);
}

function RestartJoystick() : boolean {
	return Input.GetKeyDown("joystick button 8");
}

function EscapeJoystick() : boolean {
	return Input.GetKeyDown("joystick button 9");
}