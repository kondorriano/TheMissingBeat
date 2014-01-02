#pragma strict

function Start () {

}

function Update () {
	if (Input.GetMouseButton(0)) {
    	//Debug.Log("Mouse is down");
     
    	var hitInfo : RaycastHit = new RaycastHit();
    	var hit : boolean = Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), hitInfo);
    	if (hit) {
    		Debug.Log("Hit " + hitInfo.transform.gameObject.name);
    		if (hitInfo.transform.gameObject.tag == "Item") {
				hitInfo.transform.gameObject.SendMessage("changeActivation");
    		} else {
    			Debug.Log ("nopz");
    		}
    	} else {
    		Debug.Log("No hit");
    	}
    }
}

