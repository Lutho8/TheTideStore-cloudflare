@echo off
REM Upload all Ride The Tide product vial images to Cloudflare R2
REM Requires: wrangler CLI authenticated with your Cloudflare account
REM Usage: double-click this file or run in Command Prompt

echo ==========================================
echo  Ride The Tide — R2 Image Upload
echo ==========================================
echo.

set "IMGDIR=%~dp0product-images"
set "BUCKET=thetide-images"

if not exist "%IMGDIR%\bpc-157.png" (
  echo ERROR: product-images folder not found or missing images.
  echo Make sure product-images/ is in the same folder as this script.
  pause
  exit /b 1
)

echo Uploading 30 product vial images to R2 bucket: %BUCKET%
echo.

wrangler r2 object put %BUCKET%/products/bpc-157.png --file="%IMGDIR%\bpc-157.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/bpc-157-tb-500.png --file="%IMGDIR%\bpc-157-tb-500.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/cjc-1295-ipamorelin.png --file="%IMGDIR%\cjc-1295-ipamorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dp3-r.png --file="%IMGDIR%\dp3-r.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dp2-t.png --file="%IMGDIR%\dp2-t.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/tb-500.png --file="%IMGDIR%\tb-500.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/tesamorelin.png --file="%IMGDIR%\tesamorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/sermorelin.png --file="%IMGDIR%\sermorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/ipamorelin.png --file="%IMGDIR%\ipamorelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/mots-c.png --file="%IMGDIR%\mots-c.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/nad-plus.png --file="%IMGDIR%\nad-plus.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/l-glutathione.png --file="%IMGDIR%\l-glutathione.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/aod-9604.png --file="%IMGDIR%\aod-9604.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dp1-s.png --file="%IMGDIR%\dp1-s.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/ghk-cu.png --file="%IMGDIR%\ghk-cu.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/glow.png --file="%IMGDIR%\glow.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/klow.png --file="%IMGDIR%\klow.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/kpv.png --file="%IMGDIR%\kpv.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/cjc-1295-no-dac.png --file="%IMGDIR%\cjc-1295-no-dac.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/thymosin-alpha-1.png --file="%IMGDIR%\thymosin-alpha-1.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/selank.png --file="%IMGDIR%\selank.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/semax.png --file="%IMGDIR%\semax.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/igf-1-lr3.png --file="%IMGDIR%\igf-1-lr3.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/dsip.png --file="%IMGDIR%\dsip.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/hexarelin.png --file="%IMGDIR%\hexarelin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/melanotan-ii.png --file="%IMGDIR%\melanotan-ii.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/kisspeptin.png --file="%IMGDIR%\kisspeptin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/oxytocin.png --file="%IMGDIR%\oxytocin.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/pt-141.png --file="%IMGDIR%\pt-141.png" --content-type=image/png
wrangler r2 object put %BUCKET%/products/cagrilintide.png --file="%IMGDIR%\cagrilintide.png" --content-type=image/png

echo.
echo ==========================================
echo  Upload complete! All 30 images uploaded.
echo ==========================================
echo.
echo Images are now available at:
echo   https://r2.ridethetide.site/products/{slug}.png
echo.
pause
