(function () {
  'use strict';

  document.querySelectorAll('[data-acg-result-card-calculator]').forEach(function (calculator) {
    var measurements = calculator.querySelectorAll('[data-acg-measurement]');
    var calculateButton = calculator.querySelector('[data-acg-calculate]');
    var resultCard = calculator.querySelector('[data-acg-result]');
    var resultTitle = calculator.querySelector('[data-acg-result-title]');
    var resultText = calculator.querySelector('[data-acg-result-description]');
    var resultIcon = calculator.querySelector('[data-acg-result-icon]');
    var featureList = calculator.querySelector('[data-acg-result-features]');
    var flatteringList = calculator.querySelector('[data-acg-result-flattering]');
    var avoidList = calculator.querySelector('[data-acg-result-avoid]');

    var bodyShapeIcons = {
      pear: '<svg viewBox="0 0 100 100"><path d="M50 8c6 0 10 4 10 10 0 7-5 11-7 15 18 7 28 20 28 35 0 16-13 25-31 25S19 84 19 68c0-15 10-28 28-35-2-4-7-8-7-15 0-6 4-10 10-10Z"/></svg>',
      apple: '<svg viewBox="0 0 100 100"><path d="M52 27c7-11 18-12 25-10-2 9-10 14-20 13M49 30c-20-12-34 4-32 25 2 24 17 36 33 36s31-12 33-36c2-21-13-37-34-25Z"/><path d="M50 28c0-8 1-14 8-19"/></svg>',
      hourglass: '<svg viewBox="0 0 100 100"><path d="M23 10h54M27 10c0 22 10 25 23 40-13 15-23 18-23 40M73 10c0 22-10 25-23 40 13 15 23 18 23 40M23 90h54"/></svg>',
      rectangle: '<svg viewBox="0 0 100 100"><rect x="27" y="10" width="46" height="80" rx="8"/></svg>',
      invertedTriangle: '<svg viewBox="0 0 100 100"><path d="M14 16h72L61 88H39L14 16Z"/></svg>'
    };

    var shapes = {
      hourglass: {
        title: 'Hourglass Shape',
        icon: bodyShapeIcons.hourglass,
        description: 'Your shoulders and hips are balanced with a naturally defined waist.',
        features: ['Balanced shoulders and hips', 'Defined waist', 'Proportionate bust', 'Evenly distributed curves'],
        flattering: ['Wrap dresses', 'Fitted blazers', 'High-waisted skirts', 'Belted silhouettes', 'V-neck tops', 'Pencil skirts'],
        avoid: ['Oversized shapeless pieces', 'Straight drop-waist dresses', 'Very boxy cuts', 'Heavy layers at the waist', 'Unstructured tunics']
      },
      pear: {
        title: 'Pear Shape',
        icon: bodyShapeIcons.pear,
        description: 'Your hips are wider than your shoulders and bust, with a defined waist.',
        features: ['Hips wider than shoulders', 'Defined waist', 'Balanced upper body', 'Lower body carries more volume'],
        flattering: ['A-line dresses', 'Fit & flare styles', 'Off-the-shoulder tops', 'Wrap dresses', 'High-waisted bottoms', 'V-necklines'],
        avoid: ['Boxy or straight cuts', 'Hip-hugging styles', 'Low-rise bottoms', 'Excessive ruffles', 'Heavy embellishments on hips']
      },
      apple: {
        title: 'Apple Shape',
        icon: bodyShapeIcons.apple,
        description: 'Your upper body carries more volume, with a softly defined waist.',
        features: ['Fuller bust or midsection', 'Balanced hips and shoulders', 'Slender legs', 'Soft waist definition'],
        flattering: ['Empire-waist dresses', 'V-necklines', 'Monochrome looks', 'Straight-leg trousers', 'Flowing tunics', 'Structured jackets'],
        avoid: ['Clingy midsection fabrics', 'Bulky belts', 'High, tight necklines', 'Low-rise bottoms', 'Cropped fitted tops']
      },
      invertedTriangle: {
        title: 'Inverted Triangle',
        icon: bodyShapeIcons.invertedTriangle,
        description: 'Your shoulders or bust are broader than your hips, creating an athletic silhouette.',
        features: ['Broad shoulders', 'Narrower hips', 'Often fuller bust', 'Sleek lower body'],
        flattering: ['Wide-leg trousers', 'A-line skirts', 'V-necklines', 'Soft draped tops', 'Detail on the lower half', 'Fit & flare dresses'],
        avoid: ['Padded shoulders', 'Boat necklines', 'Statement sleeves', 'Skinny low-rise trousers', 'Heavy upper-body details']
      },
      rectangle: {
        title: 'Rectangle Shape',
        icon: bodyShapeIcons.rectangle,
        description: 'Your shoulders, waist and hips are beautifully balanced and streamlined.',
        features: ['Similar shoulder and hip width', 'Straight silhouette', 'Balanced proportions', 'Subtle waist definition'],
        flattering: ['Belted dresses', 'Peplum tops', 'Layered styling', 'A-line skirts', 'Ruffled details', 'High-rise trousers'],
        avoid: ['Very straight shift dresses', 'Unstructured oversized pieces', 'Low-rise bottoms', 'Long boxy jackets', 'Head-to-toe shapeless looks']
      }
    };

    function createList(items) {
      return items.map(function (item) {
        return '<li>' + item + '</li>';
      }).join('');
    }

    function showResult(shape) {
      resultTitle.textContent = shape.title;
      resultText.textContent = shape.description;
      resultIcon.innerHTML = shape.icon;
      featureList.innerHTML = createList(shape.features);
      flatteringList.innerHTML = createList(shape.flattering);
      avoidList.innerHTML = createList(shape.avoid);
      resultCard.hidden = false;
    }

    function value(name) {
      return parseFloat(calculator.querySelector('[data-acg-measurement="' + name + '"]').value);
    }

    function updateFieldStatus(input) {
      var enteredValue = parseFloat(input.value);
      var isValid = Number.isFinite(enteredValue)
        && enteredValue >= parseFloat(input.min)
        && enteredValue <= parseFloat(input.max);

      input.closest('.acg-field').classList.toggle('is-valid', isValid);
    }

    measurements.forEach(function (input) {
      input.addEventListener('input', function () {
        updateFieldStatus(input);
      });
    });

    calculateButton.addEventListener('click', function () {
      var shoulders = value('shoulders');
      var bust = value('bust');
      var waist = value('waist');
      var hips = value('hips');

      if (isNaN(shoulders) || isNaN(bust) || isNaN(waist) || isNaN(hips)) {
        resultTitle.textContent = 'Missing Measurements';
        resultText.textContent = 'Please enter all four measurements.';
        resultIcon.textContent = '—';
        featureList.innerHTML = '';
        flatteringList.innerHTML = '';
        avoidList.innerHTML = '';
        resultCard.hidden = false;
        return;
      }

      var upper = Math.max(shoulders, bust);
      var upperVsHips = upper - hips;
      var hipsVsUpper = hips - upper;
      var waistUpperRatio = waist / upper;
      var waistHipRatio = waist / hips;

      if (Math.abs(upper - hips) <= 2 && waistUpperRatio <= 0.75) {
        showResult(shapes.hourglass);
      } else if (hipsVsUpper >= 2 && waistHipRatio <= 0.80) {
        showResult(shapes.pear);
      } else if (waistUpperRatio >= 0.80 && upper >= hips) {
        showResult(shapes.apple);
      } else if (upperVsHips >= 2 && waistUpperRatio < 0.80) {
        showResult(shapes.invertedTriangle);
      } else {
        showResult(shapes.rectangle);
      }
    });
  });
}());
