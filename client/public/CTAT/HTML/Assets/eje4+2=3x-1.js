function myDoneFunction(aSummary) {
  // Inspect the problem summary 'aSummary' xml in case
  // you need to get more information about how well the student
  // did
  const dom = parseXml(aSummary);
  const obj = parseXml(dom.message.properties.ProblemSummary["#text"]);
  const question = "4+2=3x-1";
  const errors = parseFloat(obj.ProblemSummary.Errors);
  const timeElapsed = parseFloat(obj.ProblemSummary.TimeElapsed) / 1000;
  window.top.postMessage(
    JSON.stringify({ question, errors, timeElapsed }),
    "*"
  );
  $.alert({
    title: "Felicitaciones",
    content: "Has completado con exito el ejercicio",
    buttons: {
      confirm: function () {
        document.location.href = "ejercicio4.html";
      },
    },
  });
}

var myVars = {
  question_file: "../FinalBRDs/ejercicio1-4.brd",
  tutoring_service_communication: "javascript",
};

// The CTAT JavaScript code looks for a ctatOnload() function and
// executes it automatically if it is defined in your tutor.
function ctatOnload() {
  initTutor(myVars);

  CTATCommShell.commShell.assignDoneProcessor(myDoneFunction);
}
function parseXml(xml, arrayTags) {
  let dom = null;
  if (window.DOMParser) dom = new DOMParser().parseFromString(xml, "text/xml");
  else if (window.ActiveXObject) {
    dom = new ActiveXObject("Microsoft.XMLDOM");
    dom.async = false;
    if (!dom.loadXML(xml))
      throw dom.parseError.reason + " " + dom.parseError.srcText;
  } else throw new Error("cannot parse xml string!");

  function parseNode(xmlNode, result) {
    if (xmlNode.nodeName == "#text") {
      let v = xmlNode.nodeValue;
      if (v.trim()) result["#text"] = v;
      return;
    }

    let jsonNode = {},
      existing = result[xmlNode.nodeName];
    if (existing) {
      if (!Array.isArray(existing))
        result[xmlNode.nodeName] = [existing, jsonNode];
      else result[xmlNode.nodeName].push(jsonNode);
    } else {
      if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1)
        result[xmlNode.nodeName] = [jsonNode];
      else result[xmlNode.nodeName] = jsonNode;
    }

    if (xmlNode.attributes)
      for (let attribute of xmlNode.attributes)
        jsonNode[attribute.nodeName] = attribute.nodeValue;

    for (let node of xmlNode.childNodes) parseNode(node, jsonNode);
  }

  let result = {};
  for (let node of dom.childNodes) parseNode(node, result);

  return result;
}
