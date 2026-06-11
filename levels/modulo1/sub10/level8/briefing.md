# Level 98: CGI Scripting basic setup

Common Gateway Interface (CGI) is a standard method for web servers to run console scripts dynamically and return the output to web browsers. 

A CGI script must output the standard HTTP headers first, followed by a blank line, and then the HTML body.

## Your Task

Create a CGI Bash script at `/home/operator/cgi-bin/stats.cgi` that:
1. Outputs the required HTTP content-type header: `Content-type: text/html` followed by an empty line.
2. Outputs an HTML document containing:
   - An `<h1>` heading with the text `System Statistics`.
   - The output of the command `uptime` wrapped in `<pre>...</pre>` tags.
   - The output of the command `df -h` wrapped in `<pre>...</pre>` tags.
3. Make sure the script is executable.

To test your script:
```bash
./cgi-bin/stats.cgi
```
Ensure the header is printed first, then a completely blank line, and then the HTML output.

Good luck!
