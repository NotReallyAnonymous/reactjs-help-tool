import { useState } from 'react'
import Command from './components/Command'
import CommandTabs from './components/CommandTabs'
import FlagCheckBox from './components/FlagCheckBox'
import SelectBox from './components/SelectBox'
import TextBox from './components/TextBox'
import './App.css'

const nslookupTypes = ['A', 'MX', 'TXT']

function App() {
  const [activePage, setActivePage] = useState('main')
  const [pingTarget, setPingTarget] = useState('8.8.8.8')
  const [pingPackets, setPingPackets] = useState('')
  const [pingInterval, setPingInterval] = useState('')
  const [pingContinuous, setPingContinuous] = useState(false)
  const [tracerouteTarget, setTracerouteTarget] = useState('8.8.8.8')
  const [nslookupTarget, setNslookupTarget] = useState('example.com')
  const [nslookupType, setNslookupType] = useState('A')
  const [showNetstatAll, setShowNetstatAll] = useState(true)
  const [showNetstatNumeric, setShowNetstatNumeric] = useState(true)
  const [showNetstatPid, setShowNetstatPid] = useState(true)

  const buildPingCommand = (platform) => {
    const target = pingTarget || '<host>'
    const countFlag = pingPackets
      ? platform === 'linux'
        ? ` -c ${pingPackets}`
        : ` -n ${pingPackets}`
      : ''
    const intervalFlag = pingInterval
      ? platform === 'linux'
        ? ` -i ${pingInterval}`
        : ` -w ${pingInterval}`
      : ''
    const continuousFlag =
      pingContinuous && platform !== 'linux' ? ' -t' : ''

    return `ping${continuousFlag}${countFlag}${intervalFlag} ${target}`
  }

  const pingControls = (
    <>
      <div className="field-row">
        <TextBox
          id="ping-target"
          header="Ping target"
          value={pingTarget}
          onChange={(event) => setPingTarget(event.target.value)}
          placeholder="8.8.8.8"
        />
        <TextBox
          id="ping-packets"
          header="Number of packets"
          value={pingPackets}
          onChange={(event) => setPingPackets(event.target.value)}
          placeholder="Leave blank"
        />
        <TextBox
          id="ping-interval"
          header="Interval (seconds)"
          value={pingInterval}
          onChange={(event) => setPingInterval(event.target.value)}
          placeholder="Leave blank"
        />
      </div>
      <FlagCheckBox
        id="ping-continuous"
        header="Ping continuously"
        flag="-t"
        checked={pingContinuous}
        onChange={(event) => setPingContinuous(event.target.checked)}
      />
    </>
  )

  const netstatFlags = [
    showNetstatAll ? ' -a' : '',
    showNetstatNumeric ? ' -n' : '',
    showNetstatPid ? ' -o' : '',
  ].join('')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Network Command Helper</h1>
        <p>Switch between pages to explore ready-to-copy terminal commands.</p>
        <div className="page-nav" role="tablist" aria-label="Pages">
          <button
            type="button"
            className={`page-button${activePage === 'main' ? ' is-active' : ''}`}
            onClick={() => setActivePage('main')}
            role="tab"
            aria-selected={activePage === 'main'}
          >
            Main
          </button>
          <button
            type="button"
            className={`page-button${activePage === 'commands' ? ' is-active' : ''}`}
            onClick={() => setActivePage('commands')}
            role="tab"
            aria-selected={activePage === 'commands'}
          >
            Commands
          </button>
        </div>
      </header>

      <main className="app-content">
        {activePage === 'commands' ? (
          <>
            <CommandTabs
              title="Ping"
              description="Adjust packet count or interval to update the ping command."
            >
              <Command
                tabLabel="CMD"
                title="Ping (Command Prompt)"
                description="Windows Command Prompt ping options."
                command={buildPingCommand('windows')}
              >
                {pingControls}
              </Command>
              <Command
                tabLabel="PowerShell"
                title="Ping (PowerShell)"
                description="PowerShell uses the same ping flags as CMD."
                command={buildPingCommand('windows')}
              >
                {pingControls}
              </Command>
              <Command
                tabLabel="Linux"
                title="Ping (Linux)"
                description="Linux ping uses -c for count and -i for interval."
                command={buildPingCommand('linux')}
              >
                {pingControls}
              </Command>
            </CommandTabs>

            <CommandTabs
              title="Traceroute"
              description="Trace the network path to a target host."
            >
              <Command
                tabLabel="CMD"
                title="Traceroute (Command Prompt)"
                description="Use tracert on Windows with no DNS lookups."
                command={`tracert -d ${tracerouteTarget || '<host>'}`}
              >
                <TextBox
                  id="traceroute-target"
                  header="Traceroute target"
                  value={tracerouteTarget}
                  onChange={(event) => setTracerouteTarget(event.target.value)}
                  placeholder="8.8.8.8"
                />
              </Command>
              <Command
                tabLabel="PowerShell"
                title="Traceroute (PowerShell)"
                description="PowerShell also uses tracert with the same flags."
                command={`tracert -d ${tracerouteTarget || '<host>'}`}
              >
                <TextBox
                  id="traceroute-target-ps"
                  header="Traceroute target"
                  value={tracerouteTarget}
                  onChange={(event) => setTracerouteTarget(event.target.value)}
                  placeholder="8.8.8.8"
                />
              </Command>
              <Command
                tabLabel="Linux"
                title="Traceroute (Linux)"
                description="Use traceroute with numeric output and max hops."
                command={`traceroute -n -m 30 ${tracerouteTarget || '<host>'}`}
              >
                <TextBox
                  id="traceroute-target-linux"
                  header="Traceroute target"
                  value={tracerouteTarget}
                  onChange={(event) => setTracerouteTarget(event.target.value)}
                  placeholder="8.8.8.8"
                />
              </Command>
            </CommandTabs>

            <Command
              title="Nslookup"
              description="Choose a DNS record type to query."
              command={`nslookup -type=${nslookupType} ${nslookupTarget || '<domain>'}`}
            >
              <div className="field-row">
                <TextBox
                  id="nslookup-target"
                  header="Domain"
                  value={nslookupTarget}
                  onChange={(event) => setNslookupTarget(event.target.value)}
                  placeholder="example.com"
                />
                <SelectBox
                  id="nslookup-type"
                  header="Record type"
                  value={nslookupType}
                  onChange={(event) => setNslookupType(event.target.value)}
                  options={nslookupTypes}
                />
              </div>
            </Command>

            <CommandTabs
              title="IP configuration"
              description="Check interface summaries with ipconfig or ip."
            >
              <Command
                tabLabel="Windows"
                title="Ipconfig (Windows)"
                description="Show all adapter details."
                command="ipconfig /all"
              />
              <Command
                tabLabel="Linux link"
                title="IP link show (Linux)"
                description="List interfaces and link status."
                command="ip link show"
              />
              <Command
                tabLabel="Linux addr"
                title="IP addr show (Linux)"
                description="Display IP addresses assigned to interfaces."
                command="ip addr show"
              />
            </CommandTabs>

            <CommandTabs
              title="Netstat / ss"
              description="Review active connections and listening ports."
            >
              <Command
                tabLabel="Windows"
                title="Netstat (Windows)"
                description="Toggle common netstat flags."
                command={`netstat${netstatFlags}`}
              >
                <div className="field-row">
                  <FlagCheckBox
                    id="netstat-all"
                    header="Show all"
                    flag="-a"
                    checked={showNetstatAll}
                    onChange={(event) => setShowNetstatAll(event.target.checked)}
                  />
                  <FlagCheckBox
                    id="netstat-numeric"
                    header="Numeric"
                    flag="-n"
                    checked={showNetstatNumeric}
                    onChange={(event) => setShowNetstatNumeric(event.target.checked)}
                  />
                  <FlagCheckBox
                    id="netstat-pid"
                    header="Show PID"
                    flag="-o"
                    checked={showNetstatPid}
                    onChange={(event) => setShowNetstatPid(event.target.checked)}
                  />
                </div>
              </Command>
              <Command
                tabLabel="Linux"
                title="SS (Linux)"
                description="Use ss to list TCP/UDP listeners with process info."
                command="ss -tulnup"
              />
            </CommandTabs>

            <Command
              title="Whoami"
              description="Print the current username."
              command="whoami"
            />

            <Command
              title="Hostname"
              description="Show the system hostname."
              command="hostname"
            />
          </>
        ) : null}
      </main>
    </div>
  )
}

export default App
