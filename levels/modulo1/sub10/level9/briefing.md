# Level 99: CGI Query String Parser

Web scripts interact with users by accepting parameters. In CGI, the web server passes parameters appended to the URL in the query string via the `QUERY_STRING` environment variable (e.g., `user=Alice&action=reboot`).

Your task is to write a CGI script that parses these parameters.

## Your Task

Create a CGI Bash script at `/home/operator/cgi-bin/query.cgi` that:
1. Outputs the HTTP header: `Content-type: text/plain` followed by an empty line.
2. Parses the `QUERY_STRING` environment variable.
3. Retrieves the values for the `user` and `action` keys.
4. Outputs the parsed values in this format:
   ```
   User: <user_value>
   Action: <action_value>
   ```
5. If `user` or `action` is missing or empty in the query string, output `unknown` as the value.
6. Make sure the script is executable.

### Example

Running the script with:
```bash
QUERY_STRING="user=Alice&action=restart" ./cgi-bin/query.cgi
```
Should return:
```
Content-type: text/plain

User: Alice
Action: restart
```

Good luck!
