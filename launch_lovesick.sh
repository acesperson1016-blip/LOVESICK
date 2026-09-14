  GNU nano 7.2              /home/acesperson1016/MyVisualNovel/LOVESICK/launch_lovesick.sh                       
#!/bin/bash

cd "$HOME/MyVisualNovel/LOVESICK" || exit 1

PORT=8765

# Kill an old LOVESICK server on this port if one exists.
fuser -k ${PORT}/tcp 2>/dev/null

# Start local server.
python3 -m http.server "$PORT" \
  --bind 127.0.0.1 \
  >/tmp/lovesick-server.log 2>&1 &

SERVER_PID=$!

# Give server a moment to start.
sleep 1

URL="http://127.0.0.1:${PORT}"

# Try common Chromium/Chrome commands.
if command -v google-chrome >/dev/null 2>&1; then

    google-chrome \
      --app="$URL" \
      --window-size=1280,800

elif command -v chromium >/dev/null 2>&1; then

    chromium \
      --app="$URL" \
      --window-size=1280,800

elif command -v chromium-browser >/dev/null 2>&1; then

    chromium-browser \
      --app="$URL" \
      --window-size=1280,800

else

    # Chromebook fallback: open in default browser.
    xdg-open "$URL"

fi

# Stop the local server after the app window closes.
kill "$SERVER_PID" 2>/dev/null
