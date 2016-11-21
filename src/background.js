// The id of the modal and modal background overlay
var modalId = 'ek-modal';
var modalOverlayId = 'ek-overlay';
var modalBodyClassNameSelector = '.ek-modal-body p';

// The day and month when the extension will not remove evaulations
var cutOffDay = 12;
var cutOffMonth = 12;

var isItFinalsYet = function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  // If it is after 12/12, true, otherwise false
  return (dd > cutOffDay && mm === cutOffMonth);
};

var kill = function (node) {
  node.parentNode.removeChild(node);
};

/**
 * @function docesModalExist
 */
var doesModalExist = function () {
  try {

    // Elements
    var modalElement = document.querySelectorAll(modalId)[0];
    var modalOverlayElement = document.querySelectorAll(modalOverlayId)[0];
    var modalBody = document.querySelectorAll(modalBodyClassName)[0];

    if (modalBody === undefined) return false;

    var bodyTestString = 'Course evaluations are currently being conducted, and your feedback is important. Please take a moment and fill out the requested surveys, just click the below button and Go to Survey.';

    return (modalBody.innerHTML === bodyTestString);

  } catch (error) {
    throw error;
  }
};

var observerTarget = document.body;

var bodyObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function (node) {
      if (isItFinalsYet() === false) {
        if (node.id === modalId || node.id === modalOverlayId) kill(node);
      } else {

        // It's finals week now. Time to do the evaluations.
        return;
      }
    });
  });
});

bodyObserver.observe(observerTarget, {
  attributes: true,
  childList: true,
  characterData: true
});
