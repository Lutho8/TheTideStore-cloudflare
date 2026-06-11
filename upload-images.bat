@echo off
REM Upload all Ride The Tide product images (vials + boxes) to Cloudflare R2
REM Requires: wrangler CLI authenticated with your Cloudflare account
REM Usage: double-click this file or run in Command Prompt

echo ==========================================
echo  Ride The Tide — R2 Image Upload
echo  Vials + Boxes (60 total files)
echo ==========================================
echo.

set "VIALLDIR=%~dp0product-images"
set "BOXDIR=%~dp0product-images-box"
set "BUCKET=thetide-images"

if not exist "%VIALLDIR%\bpc-157.png" (
  echo ERROR: product-images folder not found.
  pause
  exit /b 1
)
if not exist "%BOXDIR%\bpc-157.png" (
  echo ERROR: product-images-box folder not found.
  pause
  exit /b 1
)

echo Uploading 30 vial images...

wrangler r2 object put %BUCKET%/products/bpc-157.png --file="%VIALLDIR%\bpc-157.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/bpc-157-tb-500.png --file="%VIALLDIR%\bpc-157-tb-500.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/cjc-1295-ipamorelin.png --file="%VIALLDIR%\cjc-1295-ipamorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dp3-r.png --file="%VIALLDIR%\dp3-r.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dp2-t.png --file="%VIALLDIR%\dp2-t.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/tb-500.png --file="%VIALLDIR%\tb-500.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/tesamorelin.png --file="%VIALLDIR%\tesamorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/sermorelin.png --file="%VIALLDIR%\sermorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/ipamorelin.png --file="%VIALLDIR%\ipamorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/mots-c.png --file="%VIALLDIR%\mots-c.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/nad-plus.png --file="%VIALLDIR%\nad-plus.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/l-glutathione.png --file="%VIALLDIR%\l-glutathione.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/aod-9604.png --file="%VIALLDIR%\aod-9604.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dp1-s.png --file="%VIALLDIR%\dp1-s.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/ghk-cu.png --file="%VIALLDIR%\ghk-cu.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/glow.png --file="%VIALLDIR%\glow.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/klow.png --file="%VIALLDIR%\klow.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/kpv.png --file="%VIALLDIR%\kpv.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/cjc-1295-no-dac.png --file="%VIALLDIR%\cjc-1295-no-dac.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/thymosin-alpha-1.png --file="%VIALLDIR%\thymosin-alpha-1.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/selank.png --file="%VIALLDIR%\selank.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/semax.png --file="%VIALLDIR%\semax.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/igf-1-lr3.png --file="%VIALLDIR%\igf-1-lr3.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dsip.png --file="%VIALLDIR%\dsip.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/hexarelin.png --file="%VIALLDIR%\hexarelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/melanotan-ii.png --file="%VIALLDIR%\melanotan-ii.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/kisspeptin.png --file="%VIALLDIR%\kisspeptin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/oxytocin.png --file="%VIALLDIR%\oxytocin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/pt-141.png --file="%VIALLDIR%\pt-141.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/cagrilintide.png --file="%VIALLDIR%\cagrilintide.png" --content-type=image/png

echo.
echo Uploading 30 box images...

wrangler r2 object put %BUCKET%/products/bpc-157-box.png --file="%BOXDIR%\bpc-157.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/bpc-157-tb-500-box.png --file="%BOXDIR%\bpc-157-tb-500.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/cjc-1295-ipamorelin-box.png --file="%BOXDIR%\cjc-1295-ipamorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dp3-r-box.png --file="%BOXDIR%\dp3-r.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dp2-t-box.png --file="%BOXDIR%\dp2-t.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/tb-500-box.png --file="%BOXDIR%\tb-500.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/tesamorelin-box.png --file="%BOXDIR%\tesamorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/sermorelin-box.png --file="%BOXDIR%\sermorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/ipamorelin-box.png --file="%BOXDIR%\ipamorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/mots-c-box.png --file="%BOXDIR%\mots-c.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/nad-plus-box.png --file="%BOXDIR%\nad-plus.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/l-glutathione-box.png --file="%BOXDIR%\l-glutathione.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/aod-9604-box.png --file="%BOXDIR%\aod-9604.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dp1-s-box.png --file="%BOXDIR%\dp1-s.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/ghk-cu-box.png --file="%BOXDIR%\ghk-cu.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/glow-box.png --file="%BOXDIR%\glow.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/klow-box.png --file="%BOXDIR%\klow.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/kpv-box.png --file="%BOXDIR%\kpv.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/cjc-1295-no-dac-box.png --file="%BOXDIR%\cjc-1295-no-dac.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/thymosin-alpha-1-box.png --file="%BOXDIR%\thymosin-alpha-1.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/selank-box.png --file="%BOXDIR%\selank.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/semax-box.png --file="%BOXDIR%\semax.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/igf-1-lr3-box.png --file="%BOXDIR%\igf-1-lr3.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dsip-box.png --file="%BOXDIR%\dsip.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/hexarelin-box.png --file="%BOXDIR%\hexarelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/melanotan-ii-box.png --file="%BOXDIR%\melanotan-ii.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/kisspeptin-box.png --file="%BOXDIR%\kisspeptin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/oxytocin-box.png --file="%BOXDIR%\oxytocin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/pt-141-box.png --file="%BOXDIR%\pt-141.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/cagrilintide-box.png --file="%BOXDIR%\cagrilintide.png" --content-type=image/png

echo.
echo ==========================================
echo  Upload complete! 60 images uploaded.
echo  30 vials + 30 boxes
echo ==========================================
echo.
echo Vials:  https://r2.ridethetide.site/products/{slug}.png
echo Boxes:  https://r2.ridethetide.site/products/{slug}-box.png
echo.
pause
