'use client'

import { useState } from 'react'

interface Tweak {
  id: string
  name: string
  description: string
  category: 'fps' | 'network' | 'latency' | 'system'
  isActive: boolean
  script: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'fps' | 'network' | 'wifi' | 'ethernet'>('all')
  const [appliedTweaks, setAppliedTweaks] = useState<Set<string>>(new Set())

  const tweaks: Tweak[] = [
    // FPS Boost Tweaks
    {
      id: 'disable-game-dvr',
      name: 'Disable Game DVR',
      description: 'Turn off Windows Game DVR for better FPS',
      category: 'fps',
      isActive: false,
      script: 'reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f'
    },
    {
      id: 'high-performance',
      name: 'Ultimate Performance Mode',
      description: 'Enable maximum CPU performance',
      category: 'fps',
      isActive: false,
      script: 'powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61'
    },
    {
      id: 'disable-fullscreen-opt',
      name: 'Disable Fullscreen Optimization',
      description: 'Prevent Windows from optimizing fullscreen games',
      category: 'fps',
      isActive: false,
      script: 'reg add "HKCU\\System\\GameConfigStore" /v GameDVR_FSEBehaviorMode /t REG_DWORD /d 2 /f'
    },
    {
      id: 'gpu-scheduling',
      name: 'Hardware-Accelerated GPU Scheduling',
      description: 'Enable HAGS for lower latency rendering',
      category: 'fps',
      isActive: false,
      script: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v HwSchMode /t REG_DWORD /d 2 /f'
    },
    {
      id: 'disable-transparency',
      name: 'Disable Transparency Effects',
      description: 'Remove visual effects for better FPS',
      category: 'fps',
      isActive: false,
      script: 'reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v EnableTransparency /t REG_DWORD /d 0 /f'
    },

    // Network Latency Tweaks
    {
      id: 'tcp-optimizer',
      name: 'TCP Optimizer',
      description: 'Optimize TCP settings for gaming',
      category: 'network',
      isActive: false,
      script: 'netsh int tcp set global autotuninglevel=normal'
    },
    {
      id: 'disable-nagle',
      name: 'Disable Nagle Algorithm',
      description: 'Reduce network latency by disabling packet batching',
      category: 'latency',
      isActive: false,
      script: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" /v TcpAckFrequency /t REG_DWORD /d 1 /f'
    },
    {
      id: 'network-throttle',
      name: 'Disable Network Throttling',
      description: 'Remove Windows network bandwidth limits',
      category: 'network',
      isActive: false,
      script: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f'
    },
    {
      id: 'qos-packet',
      name: 'QoS Packet Scheduler',
      description: 'Prioritize gaming packets',
      category: 'network',
      isActive: false,
      script: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Psched" /v NonBestEffortLimit /t REG_DWORD /d 0 /f'
    },

    // WiFi Specific
    {
      id: 'wifi-power-save',
      name: 'Disable WiFi Power Saving',
      description: 'Prevent WiFi adapter from entering power save mode',
      category: 'network',
      isActive: false,
      script: 'powercfg /setacvalueindex scheme_current sub_none wirelessadapterpowersave 0'
    },
    {
      id: 'wifi-scanning',
      name: 'Disable WiFi Background Scanning',
      description: 'Stop automatic WiFi scanning during gameplay',
      category: 'network',
      isActive: false,
      script: 'reg add "HKLM\\SOFTWARE\\Microsoft\\WlanSvc\\Interfaces" /v BackgroundScanEnabled /t REG_DWORD /d 0 /f'
    },
    {
      id: 'wifi-roaming',
      name: 'Optimize WiFi Roaming',
      description: 'Set aggressive roaming for better connection',
      category: 'network',
      isActive: false,
      script: 'netsh wlan set profileparameter name=* RoamingAggressiveness=3'
    },

    // Ethernet Specific
    {
      id: 'ethernet-offload',
      name: 'Enable Hardware Offload',
      description: 'Offload network processing to NIC',
      category: 'network',
      isActive: false,
      script: 'netsh int tcp set global chimney=enabled'
    },
    {
      id: 'ethernet-rss',
      name: 'Receive Side Scaling',
      description: 'Distribute network load across CPU cores',
      category: 'network',
      isActive: false,
      script: 'netsh int tcp set global rss=enabled'
    },
    {
      id: 'ethernet-jumbo',
      name: 'Optimize MTU Size',
      description: 'Set optimal packet size for Ethernet',
      category: 'network',
      isActive: false,
      script: 'netsh interface ipv4 set subinterface "Ethernet" mtu=1500 store=persistent'
    },

    // System Latency
    {
      id: 'timer-resolution',
      name: 'High Resolution Timer',
      description: 'Improve system timer precision',
      category: 'latency',
      isActive: false,
      script: 'bcdedit /set useplatformclock true'
    },
    {
      id: 'disable-hpet',
      name: 'Optimize HPET',
      description: 'Configure High Precision Event Timer',
      category: 'latency',
      isActive: false,
      script: 'bcdedit /deletevalue useplatformclock'
    },
    {
      id: 'cpu-parking',
      name: 'Disable CPU Core Parking',
      description: 'Keep all CPU cores active',
      category: 'system',
      isActive: false,
      script: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerSettings\\54533251-82be-4824-96c1-47b60b740d00\\0cc5b647-c1df-4637-891a-dec35c318583" /v ValueMax /t REG_DWORD /d 0 /f'
    },
    {
      id: 'msi-mode',
      name: 'Enable MSI Mode',
      description: 'Enable Message Signaled Interrupts for GPU',
      category: 'system',
      isActive: false,
      script: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Enum\\PCI" /v MSISupported /t REG_DWORD /d 1 /f'
    }
  ]

  const toggleTweak = (id: string) => {
    setAppliedTweaks(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const applyAll = () => {
    const allIds = tweaks.map(t => t.id)
    setAppliedTweaks(new Set(allIds))
  }

  const resetAll = () => {
    setAppliedTweaks(new Set())
  }

  const downloadBatchFile = () => {
    const activeTweaks = tweaks.filter(t => appliedTweaks.has(t.id))
    const batchContent = [
      '@echo off',
      'echo PC Performance Optimization Script',
      'echo ====================================',
      'echo.',
      'echo Requesting administrator privileges...',
      'net session >nul 2>&1',
      'if %errorLevel% == 0 (',
      '    echo Administrator privileges confirmed.',
      ') else (',
      '    echo ERROR: Administrator privileges required!',
      '    echo Right-click this file and select "Run as administrator"',
      '    pause',
      '    exit',
      ')',
      'echo.',
      'echo Applying tweaks...',
      'echo.',
      ...activeTweaks.map(t => [
        `echo Applying: ${t.name}`,
        t.script,
        'echo.'
      ]).flat(),
      'echo.',
      'echo ====================================',
      'echo All tweaks applied successfully!',
      'echo Please restart your PC for changes to take effect.',
      'echo ====================================',
      'pause'
    ].join('\n')

    const blob = new Blob([batchContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'PC_Performance_Tweaks.bat'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadPowerShell = () => {
    const activeTweaks = tweaks.filter(t => appliedTweaks.has(t.id))
    const psContent = [
      '# PC Performance Optimization Script',
      '# Requires Administrator privileges',
      '',
      'if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {',
      '    Write-Warning "This script requires Administrator privileges!"',
      '    Write-Warning "Please right-click and select \\"Run as Administrator\\""',
      '    pause',
      '    exit',
      '}',
      '',
      'Write-Host "PC Performance Optimization Script" -ForegroundColor Green',
      'Write-Host "====================================" -ForegroundColor Green',
      'Write-Host ""',
      '',
      ...activeTweaks.map(t => [
        `Write-Host "Applying: ${t.name}" -ForegroundColor Cyan`,
        `Start-Process cmd -ArgumentList '/c ${t.script}' -Wait -NoNewWindow`,
        'Write-Host ""'
      ]).flat(),
      '',
      'Write-Host "====================================" -ForegroundColor Green',
      'Write-Host "All tweaks applied successfully!" -ForegroundColor Green',
      'Write-Host "Please restart your PC for changes to take effect." -ForegroundColor Yellow',
      'Write-Host "====================================" -ForegroundColor Green',
      'pause'
    ].join('\n')

    const blob = new Blob([psContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'PC_Performance_Tweaks.ps1'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredTweaks = tweaks.filter(tweak => {
    if (activeTab === 'all') return true
    if (activeTab === 'fps') return tweak.category === 'fps' || tweak.category === 'system'
    if (activeTab === 'network') return tweak.category === 'network' || tweak.category === 'latency'
    if (activeTab === 'wifi') return tweak.name.toLowerCase().includes('wifi') || tweak.category === 'network'
    if (activeTab === 'ethernet') return tweak.name.toLowerCase().includes('ethernet') || tweak.category === 'network'
    return true
  })

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
            PC Performance Tweaks
          </h1>
          <p className="text-xl text-gray-300">
            Maximize FPS • Minimize Latency • Optimize Network Performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-card p-6 rounded-lg glow">
            <div className="text-neon-green text-4xl font-bold mb-2">{appliedTweaks.size}</div>
            <div className="text-gray-400">Tweaks Selected</div>
          </div>
          <div className="bg-dark-card p-6 rounded-lg glow-blue">
            <div className="text-neon-blue text-4xl font-bold mb-2">{tweaks.length}</div>
            <div className="text-gray-400">Total Available</div>
          </div>
          <div className="bg-dark-card p-6 rounded-lg glow">
            <div className="text-neon-green text-4xl font-bold mb-2">
              {appliedTweaks.size > 0 ? Math.round((appliedTweaks.size / tweaks.length) * 100) : 0}%
            </div>
            <div className="text-gray-400">Optimization Level</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {(['all', 'fps', 'network', 'wifi', 'ethernet'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-neon-green text-dark-bg glow'
                  : 'bg-dark-card text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={applyAll}
            className="px-8 py-4 bg-neon-green text-dark-bg rounded-lg font-bold hover:bg-green-400 transition-all glow"
          >
            ✓ Select All Tweaks
          </button>
          <button
            onClick={resetAll}
            className="px-8 py-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 transition-all"
          >
            ✗ Reset All
          </button>
          <button
            onClick={downloadBatchFile}
            disabled={appliedTweaks.size === 0}
            className={`px-8 py-4 rounded-lg font-bold transition-all ${
              appliedTweaks.size > 0
                ? 'bg-neon-blue text-dark-bg hover:bg-blue-400 glow-blue'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            ⬇ Download .BAT File
          </button>
          <button
            onClick={downloadPowerShell}
            disabled={appliedTweaks.size === 0}
            className={`px-8 py-4 rounded-lg font-bold transition-all ${
              appliedTweaks.size > 0
                ? 'bg-purple-600 text-white hover:bg-purple-500'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            ⬇ Download .PS1 File
          </button>
        </div>

        {/* Tweaks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTweaks.map(tweak => (
            <div
              key={tweak.id}
              onClick={() => toggleTweak(tweak.id)}
              className={`bg-dark-card p-6 rounded-lg cursor-pointer card-hover border-2 transition-all ${
                appliedTweaks.has(tweak.id)
                  ? 'border-neon-green animate-pulse-glow'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white flex-1">{tweak.name}</h3>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    appliedTweaks.has(tweak.id)
                      ? 'bg-neon-green border-neon-green'
                      : 'border-gray-500'
                  }`}
                >
                  {appliedTweaks.has(tweak.id) && (
                    <span className="text-dark-bg text-sm font-bold">✓</span>
                  )}
                </div>
              </div>
              <p className="text-gray-400 mb-4">{tweak.description}</p>
              <div className="flex gap-2 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tweak.category === 'fps'
                      ? 'bg-red-600/20 text-red-400'
                      : tweak.category === 'network'
                      ? 'bg-blue-600/20 text-blue-400'
                      : tweak.category === 'latency'
                      ? 'bg-purple-600/20 text-purple-400'
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}
                >
                  {tweak.category.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-dark-card p-8 rounded-lg border-2 border-neon-green/30">
          <h2 className="text-2xl font-bold text-neon-green mb-4">📋 How to Use</h2>
          <ol className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="text-neon-green font-bold">1.</span>
              <span>Select the tweaks you want to apply by clicking on them</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-bold">2.</span>
              <span>Download the .BAT file (Windows Batch) or .PS1 file (PowerShell)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-bold">3.</span>
              <span><strong>Right-click</strong> the downloaded file and select <strong>"Run as Administrator"</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-bold">4.</span>
              <span>Wait for the script to complete, then <strong>restart your PC</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-bold">5.</span>
              <span>Enjoy improved FPS, lower latency, and optimized network performance!</span>
            </li>
          </ol>

          <div className="mt-6 p-4 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
            <p className="text-yellow-400 font-semibold">⚠️ Important Notes:</p>
            <ul className="mt-2 space-y-2 text-gray-300 text-sm">
              <li>• Administrator privileges are required to apply these tweaks</li>
              <li>• Some tweaks may require a system restart to take effect</li>
              <li>• Always create a system restore point before applying optimizations</li>
              <li>• Test performance in your games after applying changes</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
