#pragma strict

function OnTriggerEnter(col : Collider) {
	Application.LoadLevel(Application.loadedLevel+1);
}