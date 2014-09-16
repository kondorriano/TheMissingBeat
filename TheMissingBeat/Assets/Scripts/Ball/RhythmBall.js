#pragma strict

//Script que escala el engranaje y lanza una onda

public var freq : int = 1;
public var speed : float = 8;
public var expand : float = 2;
public var shrink : float = 1;
private var heartbeat : boolean = false;
private var escala : Vector3;

public var activated : boolean = true;
private var myColor : Color;

/**NEW**/
//public var beatWave : Rigidbody;

//private var bWTrigger : GameObject;

function Start() {
	escala = transform.localScale;
//	bWTrigger = GameObject.FindGameObjectWithTag("waveTrigger");
	myColor = renderer.material.color;
	if(!activated)renderer.material.color = myColor*0.7;

}




function Update () {
	/*
	if(Input.GetKeyDown(KeyCode.Space)) {
		heartbeat = true;
		transform.localScale = escala + Vector3(1,1,1)*expand;		
	}
	*/
	if(heartbeat){
		transform.localScale -= Vector3(1,1,1)*shrink*Time.deltaTime*speed;
		if(transform.localScale.x <= escala.x) {
			transform.localScale = escala;
			heartbeat = false;
		} 
	}
}

function Beat(beat : int) {
	if(activated) {
		if ((beat)%freq == 0) {
			heartbeat = true;
			transform.localScale += Vector3(1,1,1)*expand;
			//var bW : Rigidbody = Instantiate(beatWave, transform.position, beatWave.transform.rotation); //NEW
			//bWTrigger.SendMessage("setWave", bW.gameObject);

			//bW.velocity = transform.parent.rigidbody.velocity;//NEW
		}
	}
	

}

function Beat() {
	heartbeat = true;
	transform.localScale += Vector3(1,1,1)*expand;
	//var bW : Rigidbody = Instantiate(beatWave, transform.position, beatWave.transform.rotation); //NEW
	//bWTrigger.SendMessage("setWave", bW.gameObject);

	//bW.velocity = transform.parent.rigidbody.velocity;//NEW
	

}

function ChangeFrequency(frequency : float) {
	freq = frequency;
}

function activateBeat() {
	activated = true;
	renderer.material.color = myColor;
}

