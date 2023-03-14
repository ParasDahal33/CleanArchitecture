import os
import zipfile

import paramiko

from getpass import getpass

from rich.console import Console
from rich.progress import track
from art import text2art


PUBLISH_FOLDER = "./dist"
PUBLISH_OUTPUT = "dist.zip"

SERVER_DIR = "/home/mb-linux/Projects/mb-front"

USERNAME = "mb-linux"

console = Console()

title = text2art("MB-FRONT", font="block")


def zip_dir(path, zip_file):
    '''
    Zips the specified folder.
    '''

    for root, _, files in track(os.walk(path), description="[red]Compressing files:"):
        for file in files:
            zip_file.write(os.path.join(root, file),
                           os.path.relpath(os.path.join(root, file),
                                           os.path.join(path, '..')))


console.print(f'[cyan]{title}')
with console.status(f"[bold blue]Enter password for [bold red]{USERNAME}: ", spinner="arrow3", speed=1.2):
    password = getpass("")

# Connect to the server via ssh
client = paramiko.SSHClient()
with console.status("[orange1]Connecting to local server..."):
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname="192.168.0.137",
                   username=USERNAME, password=password)

# Build the project.
with console.status("[blue]Building project: "):
    os.system('npm run build')

# Create a ftp client to transfer files.
ftp_client = client.open_sftp()

# Compress the publish folder into a zip file.
with zipfile.ZipFile(PUBLISH_OUTPUT, 'w', zipfile.ZIP_DEFLATED) as zip_file:
    zip_dir(PUBLISH_FOLDER, zip_file)

# Copy the zipped bin folder in the projects dir of the server.
with console.status("[orange3]Copying zip file..."):
    ftp_client.put(PUBLISH_OUTPUT,
                   f'{SERVER_DIR}/dist.zip')

command = f"sudo python3 {SERVER_DIR}/server_side.py"


console.rule("[bold bright_magenta]Server side scripts")

std_in, std_out, std_dir = client.exec_command(
    command, get_pty=True)

# Enter password for sudo but prevent showing it in console.
std_in.write(password+'\n')
print("\033[A                             \033[A")
print("\033[A                             \033[A")

for i in std_out.readlines():
    print(i)

console.print(
    '[bold green]Success!! The mb-frontend is now running at: http://192.168.0.137:1337')
