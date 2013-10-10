#pragma strict

public var speed : float = 8;
public var expand : float = 2;
private var heartbeat : boolean = false;
private var escala : Vector3;

/**NEW**/
public var beatWave : Rigidbody;

function Start() {
	escala = transform.localScale;
}




function Update () {
	/*
	if(Input.GetKeyDown(KeyCode.Space)) {
		heartbeat = true;
		transform.localScale = escala + Vector3(1,1,1)*expand;		
	}
	*/
	if(heartbeat){
		transform.localScale -= Vector3(1,1,1)*Time.deltaTime*speed;
		if(transform.localScale.x <= escala.x) {
			transform.localScale = escala;
			heartbeat = false;
		} 
	}
}

function Beat() {
	heartbeat = true;
	transform.localScale += Vector3(1,1,1)*expand;
	var bW : Rigidbody = Instantiate(beatWave, transform.position, beatWave.transform.rotation); //NEW
	bW.velocity = transform.parent.rigidbody.velocity;//NEW
	

}