---
title: Download
weight: 10
draft: true
---
# Download and Install `ops`

You can install Nuvolaris using its Command Line Interface, `nuv`.

You can download it for your system. It is available for the following
operating systems, architectures and formats:

- for Microsoft Windows, 64-bit version only, version 10 or greater,
    for Intel architecture, in Microsoft Installer `msi` format

  -

- on Apple macOS, version 12 (Monterey) or greater, for Intel and ARM
    architectures, in `pkg` format.

  -
  -

- On Linux, for Ubuntu 22 (Jammy), Debian 12 (Bookwork), 64-bit
    version, in format `.deb`; for RedHat 9 and for SuSE Tumbleweed, in
    `rpm` format; Available for Intel and ARM architectures, 64 bit
    only.

  -
  -
  -
  -

- On Linux, for Ubuntu 20 (Focal), Debian 11 (Bullseye), 64-bit
    version, in format `.deb`; for RedHat at least version 8 and for
    SuSE Leap, in `rpm` format; Available for Intel and ARM
    architectures, 64 bit only.

  -
  -
  -
  -

Download your version from this page, then install it according to the
procedures of your operating system.

In all the operating systems with a graphical user interface, you can
just double click on the installer to install Nuvolaris.

beta version is currently unsigned. Check [here for install on
Mac](https://www.wikihow.com/Install-Software-from-Unsigned-Developers-on-a-Mac).

Once installed, in the first run `nuv` will tell to update the tasks
executing:

`nuv -update`

This command updates the Nuvolaris "tasks" (its internal logic) to the
latest version. This command should be also executed frequently, as the
tasks are continuously evolving and expanding.

`nuv` will suggest when to update them (at least once a day).

You normally just need to update the tasks but sometimes you also need
to update `nuv` itself. The system will detect when it is the case and
tell you what to do.
