# AI Model Documentation

**Status:** Model plan and integration contract. No model, dataset, metric, or clinical performance is claimed as implemented unless separately verified.

## 1. AI scope

The proposed AI pipeline has distinct capabilities:

1. **Image-quality assessment:** determines whether an eye image is suitable for analysis.
2. **DR severity classification:** estimates a grade from 0 to 4 for each eligible eye.
3. **Explainability:** Grad-CAM may visualize regions influencing the classifier's selected prediction.
4. **Optional lesion segmentation:** a separate model may segment supported lesions if trained/evaluated.
5. **Optional vessel segmentation:** a separate model may generate a vessel mask if trained/evaluated.

Do not treat Grad-CAM as lesion segmentation. Do not assume one classifier performs all tasks.

## 2. DR grading labels

| Grade | Common label |
|---|---|
| 0 | No DR |
| 1 | Mild DR |
| 2 | Moderate DR |
| 3 | Severe DR |
| 4 | Proliferative DR |

Use the exact label mapping and grading protocol of the selected dataset/model. Dataset labels and clinical grading protocols may differ.

## 3. Dataset candidates

Potential public research datasets mentioned in the project discussions:
- APTOS 2019.
- Messidor-2.

Before use, record:
- Official source and version.
- License/terms and permitted use.
- Number of images and patients if known.
- Camera/source characteristics.
- Label protocol and class distribution.
- Image quality and exclusion rules.
- Patient identifiers or grouping information, if available.

Do not assume a dataset can be used commercially or clinically. Confirm terms.

## 4. Data splitting and leakage prevention

- Split by patient, not merely by image, when patient identifiers are available.
- Keep train, validation, and final test sets separate.
- Do not use test data for model selection or threshold tuning.
- Document duplicates and near-duplicate handling.
- Keep a separate external or cross-camera evaluation set where feasible.
- Report dataset composition and limitations.

## 5. Preprocessing contract

Document and keep identical across training and inference:
- File decoding and RGB/channel handling.
- Image crop/field-of-view handling.
- Resize dimensions and interpolation.
- Normalization mean and standard deviation.
- Any contrast/illumination correction.
- Augmentation (training only).
- Tensor layout and dtype.
- Expected input range.

Never improvise different inference preprocessing from the one used during model training.

## 6. Model candidates

EfficientNet-B0 is one possible transfer-learning baseline, not a required or validated choice. Select a model based on:
- Dataset fit and reproducible baseline.
- Per-grade performance and class imbalance.
- Model size and inference hardware.
- Camera/population generalization.
- Licensing and deployment constraints.

Record architecture, checkpoint source, weight license, training configuration, random seeds, and model checksum.

## 7. Image-quality assessment

Possible quality dimensions:
- Blur/focus.
- Illumination and exposure.
- Contrast.
- Field-of-view coverage.
- Occlusion/artifacts.
- Image decode and dimensions.

Quality thresholds must be developed and evaluated against labeled quality data and/or a clinically reviewed protocol. A simple blur heuristic may be a prototype aid, not a validated quality model.

Possible output:
```json
{
  "status": "ACCEPTABLE",
  "reasons": [],
  "quality_model_version": "record-real-version-here"
}
```

Allowed states should include `RETAKE_REQUIRED`, `UNABLE_TO_ASSESS`, and technical failure. Do not pass unsuitable images to classification as if valid.

## 8. DR classification output

Suggested internal response:
```json
{
  "status": "SUCCESS",
  "eye": "RIGHT",
  "predicted_grade": 2,
  "scores": [0.02, 0.08, 0.71, 0.15, 0.04],
  "confidence_type": "UNCALIBRATED_MODEL_SCORE",
  "model_version": "record-real-version",
  "preprocessing_version": "record-real-version"
}
```

This is a schema example, not a real prediction. Only include fields actually produced by the model. Do not call raw softmax output a calibrated clinical probability.

Other states:
- `LOW_CONFIDENCE`
- `AI_UNAVAILABLE`
- `FAILED`
- `NOT_ASSESSED`

## 9. Grad-CAM

Grad-CAM is a post-hoc explainability method applied to a compatible trained classification model. It uses gradients and feature maps from a selected convolutional layer to produce a coarse localization map for a chosen class.

Requirements:
- Document model architecture and target layer.
- Document target class selection (usually predicted class, with alternatives clearly stated).
- Keep original image and heatmap linked to the same eye image and inference.
- Store explainer/library version and generation status.
- Display the heatmap as a visual aid, not proof of disease or lesion.
- Validate that the overlay is aligned with the source image.

## 10. Lesion and vessel segmentation

Optional lesion classes may include microaneurysms (MA), haemorrhages (HE), hard exudates (EX), and soft exudates/cotton-wool spots depending on the dataset's label definitions. These require pixel-level annotated data and a segmentation model.

Vessel segmentation requires an appropriate vessel-annotated dataset and a separate segmentation model.

A classifier, Grad-CAM map, or binary threshold image is not automatically a clinically valid lesion/vessel segmentation result. Keep these capabilities out of the MVP unless the team has suitable data, model, and evaluation.

## 11. Evaluation

For ordinal DR grading, report:
- Quadratic Weighted Kappa (QWK).
- Macro F1.
- Per-grade precision and recall.
- Confusion matrix.
- Sensitivity and specificity for clinically defined referable/severe thresholds, if approved.
- Calibration analysis if confidence is presented probabilistically.
- Performance by camera, image quality, and relevant subgroups where data permits.

For quality assessment:
- Sensitivity for detecting ungradable images.
- Specificity/acceptance performance.
- Retake rate and recapture success.

For segmentation:
- Dice and/or IoU per lesion class.
- Per-class precision/recall.
- Expert review of representative overlays.

Do not publish a single accuracy number without test-set definition, confidence intervals where appropriate, and class-wise context.

## 12. Model serving and versioning

For each inference persist:
- Model ID/version/checksum.
- Preprocessing version.
- Explainer version where used.
- Input image reference and eye side.
- Timestamp and inference status.
- Predicted grade and raw scores where available.
- Quality result and reasons.

Use a reproducible inference environment. Add timeouts and explicit unavailable states. Never silently fall back to a random or hardcoded prediction.

## 13. Clinical and generalization limitations

- Public datasets may not represent rural populations or local cameras.
- Image quality and camera differences can change performance.
- Dataset benchmark performance does not establish clinical readiness.
- A hackathon prototype is not proof of safety or diagnostic accuracy.
- Clinical validation with qualified partners is required before real-world clinical use.
