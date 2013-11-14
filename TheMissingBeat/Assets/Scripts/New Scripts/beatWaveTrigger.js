#pragma strict


private var waveRadius : float = 0;
private var wave : GameObject;

function Update() {
	if(wave != null) {
		waveRadius = (wave.transform.localScale.x*10)/2;
	} else waveRadius = 0;
}

function OnTriggerEnter(c : Collider) {
	c.SendMessage("changeBeat", true);
	c.SendMessage("myData", gameObject);
}

function OnTriggerExit(c : Collider) {
	c.SendMessage("changeBeat", false);
	c.SendMessage("myData", null);

}

public function setWave(w : GameObject) {
	wave = w;
}

public function getRadius() : float {
	return waveRadius;
}
