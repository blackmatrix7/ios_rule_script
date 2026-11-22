"""Refresh the ChatGPT Voice input before running the rule generator (Python 3)."""

import ipaddress
import json
import tempfile
import urllib.request
from datetime import datetime
from pathlib import Path

URL = "https://openai.com/chatgpt-voice.json"
OUTPUT = Path(__file__).with_name("ChatGPTVoice.list")


def render(feed):
    timestamp = datetime.fromisoformat(feed["creationTime"].replace("Z", "+00:00"))
    networks = set()
    for entry in feed["prefixes"]:
        found = False
        for key, version in (("ipv4Prefix", 4), ("ipv6Prefix", 6)):
            if key not in entry:
                continue
            prefix = entry[key]
            if not isinstance(prefix, str) or "/" not in prefix:
                raise ValueError(f"Invalid {key}: {prefix!r}")
            network = ipaddress.ip_network(prefix)
            if network.version != version or not network.prefixlen:
                raise ValueError(f"Invalid {key}: {network}")
            networks.add(network)
            found = True
        if not found:
            raise ValueError("Unrecognized entry in voice prefixes")
    if not networks:
        raise ValueError("Empty voice prefix list")

    lines = [f"# Source: {URL}", f"# creationTime: {timestamp.isoformat()}"]
    for network in sorted(networks, key=lambda net: (net.version, net)):
        kind = "IP-CIDR" if network.version == 4 else "IP-CIDR6"
        lines.append(f"{kind},{network}")
    return "\n".join(lines) + "\n"


def main():
    with urllib.request.urlopen(URL, timeout=30) as response:
        snapshot = render(json.load(response))
    if OUTPUT.exists() and OUTPUT.read_text(encoding="utf-8") == snapshot:
        return
    with tempfile.TemporaryDirectory(dir=OUTPUT.parent) as temp_dir:
        candidate = Path(temp_dir) / OUTPUT.name
        candidate.write_text(snapshot, encoding="utf-8")
        candidate.replace(OUTPUT)


if __name__ == "__main__":
    main()
