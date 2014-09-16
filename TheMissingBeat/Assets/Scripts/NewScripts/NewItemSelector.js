#pragma strict

//public var test : GameObject;

function Update () { 
	if (Input.GetMouseButton(0)){
		var hit : RaycastHit;
		if (Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), hit, 50)){
			if (hit.transform.tag == "Item"){
				hit.transform.gameObject.BroadcastMessage("changeActivation");
			}
		}
		//test.BroadcastMessage("changeActivation");
	}
}

