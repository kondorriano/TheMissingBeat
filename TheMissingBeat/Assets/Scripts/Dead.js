#pragma strict
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
	rigidbody.velocity = Vector3(0,0,0);
}

function RestartJoystick() : boolean {
	return Input.GetKeyDown("joystick button 8");
}

function EscapeJoystick() : boolean {
	return Input.GetKeyDown("joystick button 9");
}