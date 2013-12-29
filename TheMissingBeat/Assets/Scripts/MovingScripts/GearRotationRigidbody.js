#pragma strict

//El script que hace rotar diferentes engranajes
//NewGamePlay
public var activated : boolean = true;
private var beatActivation : boolean;

//EndNewGameplay

public var freq : int = 1;
public var offset : int = 0;

public var dientes : float = 4;
public var sentido : int = 1;
public var speed : float = 60;

private var rotate : boolean = false;
private var grados : float = 45;

private var initRotation : Quaternion;
private var nextRotation : Quaternion;

private var cont : int = 0;

private var activate : boolean = false; //Todo lo relacionado con etso es nuevo


function Start () {
	grados = 360.0/(dientes*2);
	initRotation = transform.rotation;
	nextRotation = initRotation;
	//NewGP
	beatActivation = activated;

}

function Update () {
	rigidbody.MoveRotation(Quaternion.Slerp(transform.rotation, nextRotation, Time.deltaTime*speed));
}

function Beat(beat : int) {
	if(activate && beatActivation) {
		if ((beat + offset)%freq == 0) {
			rotate = true;	
			++cont;
			if(cont == dientes*2) {
				nextRotation = initRotation;
				cont = 0;
			} else nextRotation = initRotation*Quaternion.Euler(0,0,sentido*cont*grados);
			//NewGamePlay
		}
		
	}
	if((beatActivation != activated) && (beat + offset)%freq == 0) beatActivation = activated;

}

function ChangeFrequency(frequency : float) {
	freq = frequency;
}

function changeBeat(b : boolean){
	activate = b;
}

function changeActivation(){
	if(beatActivation == activated) beatActivation = !activated;
}