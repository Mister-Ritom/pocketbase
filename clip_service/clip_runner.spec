from PyInstaller.utils.hooks import collect_all

tmp_ret = collect_all('ssl')
ssl_datas, ssl_binaries, ssl_hiddenimports = tmp_ret[0], tmp_ret[1], tmp_ret[2]

tmp_ret = collect_all('cryptography')
crypto_datas, crypto_binaries, crypto_hiddenimports = tmp_ret[0], tmp_ret[1], tmp_ret[2]

a = Analysis(
    ['clip_runner.py'],
    pathex=[],
    binaries=[
        ('/opt/homebrew/opt/openssl@3/lib/libssl.3.dylib', '.'),
        ('/opt/homebrew/opt/openssl@3/lib/libcrypto.3.dylib', '.'),
    ],
    datas=ssl_datas + crypto_datas,
    hiddenimports=['ssl', '_ssl'] + ssl_hiddenimports + crypto_hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=['cv2.dylibs', 'cv2'], # Try excluding cv2 to see if it fixes SSL, we might need to find a better way if cv2 is needed
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='clip_runner',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
