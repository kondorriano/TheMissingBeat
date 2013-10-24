#pragma strict

//Script que hace que el engranaje se quede pegado a la "cuchara"

private var joint : FixedJoint;
private var ignore : boolean = false;


function OnTriggerStay(collision : Collider) {
	if(joint) {
		if(collision.gameObject.tag == "TriggerCuchara") {
			Destroy(joint);
			ignore = true;
		}
	} else {
		if(!ignore && collision.gameObject.tag == "Player") {
			joint = transform.parent.gameObject.AddComponent(FixedJoint);
			joint.connectedBody = collision.rigidbody;
			
			
		}
	}
}

function OnTriggerExit(collision : Collider) {
	if(collision.gameObject.tag == "Player") ignore = false;
}






