# Spanish (Spain) back-translation review

Locale: `es-ES`  
Method: local translation and local semantic back-translation review; no external translation service used.  
Status: private seven-page draft. Routing and indexing remain disabled.

## Material-claim audit

| Source | Spanish draft | Back-translation | Result |
| --- | --- | --- | --- |
| Every word lights up in sync with narration, transcribed privately on your phone. No account. No cloud. | Cada palabra se ilumina al ritmo de la narración, transcrita de forma privada en tu teléfono. Sin cuenta. Sin nube. | Every word lights up with narration, transcribed privately on your phone. No account. No cloud. | Preserved. |
| Your audiobooks are never uploaded; there is no server to upload them to. | Tus audiolibros nunca se suben: no existe ningún servidor al que subirlos. | Your audiobooks are never uploaded; no server exists to upload them to. | Preserved. |
| Works fully offline after a one-time engine download. | Totalmente sin conexión tras una única descarga del motor. | Fully offline after a one-time engine download. | Preserved. |
| Core read-along and public-domain library are free; Pro is optional for advanced analytics. | La experiencia principal de lectura sincronizada y la biblioteca de dominio público son gratuitas. Hay una mejora Pro opcional para estadísticas avanzadas. | Core synchronized reading and public-domain library are free. There is an optional Pro upgrade for advanced analytics. | Preserved. |
| Long books transcribe in chunks, resume after interruption, and keep phone cool. | Los libros largos se transcriben por bloques, se reanudan tras un fallo y mantienen el teléfono fresco. | Long books are transcribed in chunks, resume after a failure, and keep phone cool. | Preserved; “failure” is slightly narrower than “interruption.” |
| Library includes public-domain audiobooks from LibriVox and Internet Archive in six languages. | Un catálogo integrado de audiolibros de dominio público de LibriVox e Internet Archive, en seis idiomas. | An integrated catalogue of public-domain audiobooks from LibriVox and Internet Archive, in six languages. | Preserved. |
| A brain score from 0 to 100 grows with streak, words read, comprehension, and consistency. | Una puntuación cerebral de 0 a 100 crece con tu racha, palabras leídas, comprensión y constancia. | A brain score from 0 to 100 grows with your streak, words read, comprehension, and consistency. | Preserved. |

## Corrections and pending review

- Corrected earlier unsafe substring substitutions; translation now uses full customer-visible phrases.
- Proper names, stores, formats, user names, and shared screenshot text remain unchanged where appropriate.
- [ ] Native Spanish (Spain) product-copy review.
- [ ] Legal review for Privacy Policy, Terms and Conditions, Refund Policy, and Licenses. All seven pages now exist; qualified review is still required.
- [x] Shared screenshot paths and high-signal zero-English scan pass (`node scripts/verify-localization.js es-ES`).
- [ ] Approval before routing or indexing.
