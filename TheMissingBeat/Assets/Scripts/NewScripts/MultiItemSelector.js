#pragma strict

/*** ATENCION ***/
// Es necesario que este script lo tenga el objeto 2D y que sea hijo del objeto con el script de moverse o rotar

function Update () {
	/*if (Input.GetMouseButton(0)) {    
    	var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    		///Debug.Log(wp);

    	var touchPos : Vector2 = new Vector2(wp.x, wp.y);
		if (collider2D == Physics2D.OverlapPoint(touchPos)) {
			transform.parent.transform.gameObject.SendMessage("changeActivation");
		}
		//Debug.Log(wp + " " + touchPos + " " + collider2D);

    }*/
}

function OnMouseDrag(){
	transform.gameObject.BroadcastMessage("changeActivation");
}

function OnMouseDown(){
	transform.gameObject.BroadcastMessage("changeActivation");
}