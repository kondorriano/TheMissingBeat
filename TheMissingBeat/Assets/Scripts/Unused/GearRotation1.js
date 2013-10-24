#pragma strict


public var dientes : int = 4;
public var sentido : int = 1;
public var speed : float = 60;

private var rotate : boolean = false;
private var grados : float = 45;

private var initRotation : float;
private var nextRotation : float;

private var cont : int = 0;



function Start () {
	grados = 360.0/(dientes*2);
	initRotation = transform.eulerAngles.z;
}

function Update () {
	if(rotate) {
		var angle : float = Mathf.MoveTowardsAngle(transform.eulerAngles.z, nextRotation,
		 speed * Time.deltaTime);
    	transform.eulerAngles.z = angle;
		var actRot = transform.eulerAngles.z;
		if(actRot > nextRotation-0.01 && actRot < nextRotation+0.01) {
			//transform.eulerAngles = Vector3(0, 0, nextRotation-actRot);
			rotate = false;
		}
		
	}
}

function Beat() {
	rotate = true;	
	++cont;
	if(cont == dientes*2) {
		nextRotation = initRotation;
		cont = 0;
	} else nextRotation = transform.eulerAngles.z+sentido*grados;
	
}